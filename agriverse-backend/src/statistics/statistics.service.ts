import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  // Dashboard Overview - Tổng quan cho dashboard
  async getOverview() {
    const [
      totalUsers,
      totalFarms,
      totalPlots,
      totalSeasons,
      totalOrders,
      totalHarvests,
      totalProductBatches,
      totalRevenue,
      activeSeasons,
      completedOrders,
      totalTasks,
      completedTasks,
      overdueTasks,
      todayTasks,
      totalDevices,
      activeDevices,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.farm.count(),
      this.prisma.plot.count(),
      this.prisma.season.count(),
      this.prisma.order.count(),
      this.prisma.harvest.count(),
      this.prisma.productBatch.count(),
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
      this.prisma.season.count({
        where: { status: 'GROWING' },
      }),
      this.prisma.order.count({
        where: { status: 'COMPLETED' },
      }),
      this.prisma.task.count(),
      this.prisma.task.count({
        where: { status: 'DONE' },
      }),
      this.prisma.task.count({
        where: {
          status: { not: 'DONE' },
          dueDate: { lt: new Date() },
        },
      }),
      this.prisma.task.count({
        where: {
          dueDate: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
      this.prisma.device.count(),
      this.prisma.device.count({
        where: { status: 'ACTIVE' },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: totalUsers,
      },
      farms: {
        total: totalFarms,
      },
      plots: {
        total: totalPlots,
      },
      seasons: {
        total: totalSeasons,
        active: activeSeasons,
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        overdue: overdueTasks,
        today: todayTasks,
        pending: totalTasks - completedTasks,
      },
      orders: {
        total: totalOrders,
        completed: completedOrders,
        revenue: totalRevenue._sum.totalAmount || 0,
      },
      harvests: {
        total: totalHarvests,
      },
      productBatches: {
        total: totalProductBatches,
      },
      devices: {
        total: totalDevices,
        active: activeDevices,
      },
      summary: {
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        activeSeasons: activeSeasons,
        completedOrders: completedOrders,
        overdueTasks: overdueTasks,
        todayTasks: todayTasks,
      },
    };
  }

  // Season Analytics - Phân tích mùa vụ
  async getSeasonAnalytics(seasonId?: number, from?: Date, to?: Date) {
    const where: any = {};
    if (seasonId) where.seasonId = seasonId;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = from;
      if (to) where.createdAt.lte = to;
    }

    const [seasons, tasksByStatus, harvests] = await Promise.all([
      seasonId
        ? this.prisma.season.findUnique({
            where: { id: seasonId },
            include: {
              crop: true,
              plot: { include: { farm: true } },
              tasks: true,
              logs: true,
              harvests: true,
            },
          })
        : this.prisma.season.findMany({
            where: from || to
              ? {
                  createdAt: {
                    ...(from ? { gte: from } : {}),
                    ...(to ? { lte: to } : {}),
                  },
                }
              : {},
            include: {
              crop: true,
              plot: { include: { farm: true } },
            },
          }),
      this.prisma.task.groupBy({
        by: ['status'],
        where: seasonId ? { seasonId } : {},
        _count: true,
      }),
      this.prisma.harvest.findMany({
        where: seasonId ? { seasonId } : {},
        include: { season: { include: { crop: true } } },
      }),
    ]);

    // Tính toán yield statistics
    const yieldStats = harvests.length > 0
      ? {
          totalExpected: seasons
            ? (Array.isArray(seasons)
                ? seasons.reduce((sum, s) => sum + (s.expectedYield || 0), 0)
                : seasons.expectedYield || 0)
            : 0,
          totalActual: harvests.reduce((sum, h) => sum + (h.actualYield || 0), 0),
          averageActual:
            harvests.reduce((sum, h) => sum + (h.actualYield || 0), 0) / harvests.length,
        }
      : null;

    return {
      seasons: Array.isArray(seasons) ? seasons : [seasons].filter(Boolean),
      tasksByStatus: tasksByStatus.map((t) => ({
        status: t.status || 'UNKNOWN',
        count: t._count,
      })),
      harvests: {
        total: harvests.length,
        data: harvests,
        yieldStats,
      },
    };
  }

  // Task Analytics - Phân tích công việc
  async getTaskAnalytics(seasonId?: number, from?: Date, to?: Date) {
    const where: any = {};
    if (seasonId) where.seasonId = seasonId;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = from;
      if (to) where.createdAt.lte = to;
    }

    const [tasksByStatus, tasksByType, tasksByDate] = await Promise.all([
      this.prisma.task.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      this.prisma.task.groupBy({
        by: ['taskType'],
        where,
        _count: true,
      }),
      this.prisma.task.findMany({
        where,
        select: {
          id: true,
          status: true,
          taskType: true,
          dueDate: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    // Group tasks by date for time series
    const tasksByDateMap = new Map<string, { total: number; completed: number; pending: number }>();
    tasksByDate.forEach((task) => {
      const dateKey = task.createdAt.toISOString().split('T')[0];
      if (!tasksByDateMap.has(dateKey)) {
        tasksByDateMap.set(dateKey, { total: 0, completed: 0, pending: 0 });
      }
      const stats = tasksByDateMap.get(dateKey)!;
      stats.total++;
      if (task.status === 'DONE') {
        stats.completed++;
      } else {
        stats.pending++;
      }
    });

    const timeSeries = Array.from(tasksByDateMap.entries())
      .map(([date, stats]) => ({
        date,
        ...stats,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      byStatus: tasksByStatus.map((t) => ({
        status: t.status || 'UNKNOWN',
        count: t._count,
      })),
      byType: tasksByType.map((t) => ({
        type: t.taskType || 'UNKNOWN',
        count: t._count,
      })),
      timeSeries,
    };
  }

  // Farm Logs Analytics - Phân tích nhật ký canh tác
  async getFarmLogsAnalytics(seasonId?: number, taskId?: number, from?: Date, to?: Date) {
    const where: any = {};
    if (seasonId) where.seasonId = seasonId;
    if (taskId) where.taskId = taskId;
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = from;
      if (to) where.createdAt.lte = to;
    }

    const [logsByTask, logsByDate, totalLogs] = await Promise.all([
      this.prisma.farmLog.groupBy({
        by: ['taskId'],
        where,
        _count: true,
      }),
      this.prisma.farmLog.findMany({
        where,
        select: {
          id: true,
          taskId: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.farmLog.count({ where }),
    ]);

    // Get task details for logsByTask
    const logsByTaskWithDetails = await Promise.all(
      logsByTask.map(async (log) => {
        if (!log.taskId) return { task: null, count: log._count };
        const task = await this.prisma.task.findUnique({
          where: { id: log.taskId },
          select: { id: true, title: true, taskType: true },
        });
        return { task, count: log._count };
      }),
    );

    // Group logs by date for time series
    const logsByDateMap = new Map<string, number>();
    logsByDate.forEach((log) => {
      const dateKey = log.createdAt.toISOString().split('T')[0];
      logsByDateMap.set(dateKey, (logsByDateMap.get(dateKey) || 0) + 1);
    });

    const timeSeries = Array.from(logsByDateMap.entries())
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      total: totalLogs,
      byTask: logsByTaskWithDetails.filter((l) => l.task !== null),
      timeSeries,
    };
  }

  // Sensor Data Analytics - Phân tích dữ liệu cảm biến
  async getSensorDataAnalytics(deviceId?: number, from?: Date, to?: Date) {
    const where: any = {};
    if (deviceId) where.deviceId = deviceId;
    if (from || to) {
      where.recordedAt = {};
      if (from) where.recordedAt.gte = from;
      if (to) where.recordedAt.lte = to;
    }

    const [sensorData, aggregated] = await Promise.all([
      this.prisma.sensorData.findMany({
        where,
        orderBy: { recordedAt: 'asc' },
      }),
      this.prisma.sensorData.aggregate({
        where,
        _avg: {
          temperature: true,
          humidity: true,
          soilMoisture: true,
        },
        _min: {
          temperature: true,
          humidity: true,
          soilMoisture: true,
        },
        _max: {
          temperature: true,
          humidity: true,
          soilMoisture: true,
        },
      }),
    ]);

    // Group by date for time series
    const timeSeriesMap = new Map<
      string,
      {
        temperature: number[];
        humidity: number[];
        soilMoisture: number[];
      }
    >();

    sensorData.forEach((data) => {
      const dateKey = data.recordedAt.toISOString().split('T')[0];
      if (!timeSeriesMap.has(dateKey)) {
        timeSeriesMap.set(dateKey, {
          temperature: [],
          humidity: [],
          soilMoisture: [],
        });
      }
      const dayData = timeSeriesMap.get(dateKey)!;
      if (data.temperature !== null) dayData.temperature.push(data.temperature);
      if (data.humidity !== null) dayData.humidity.push(data.humidity);
      if (data.soilMoisture !== null) dayData.soilMoisture.push(data.soilMoisture);
    });

    const timeSeries = Array.from(timeSeriesMap.entries())
      .map(([date, values]) => ({
        date,
        temperature: {
          avg:
            values.temperature.length > 0
              ? values.temperature.reduce((a, b) => a + b, 0) / values.temperature.length
              : null,
          min: values.temperature.length > 0 ? Math.min(...values.temperature) : null,
          max: values.temperature.length > 0 ? Math.max(...values.temperature) : null,
        },
        humidity: {
          avg:
            values.humidity.length > 0
              ? values.humidity.reduce((a, b) => a + b, 0) / values.humidity.length
              : null,
          min: values.humidity.length > 0 ? Math.min(...values.humidity) : null,
          max: values.humidity.length > 0 ? Math.max(...values.humidity) : null,
        },
        soilMoisture: {
          avg:
            values.soilMoisture.length > 0
              ? values.soilMoisture.reduce((a, b) => a + b, 0) / values.soilMoisture.length
              : null,
          min: values.soilMoisture.length > 0 ? Math.min(...values.soilMoisture) : null,
          max: values.soilMoisture.length > 0 ? Math.max(...values.soilMoisture) : null,
        },
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      summary: {
        average: {
          temperature: aggregated._avg.temperature,
          humidity: aggregated._avg.humidity,
          soilMoisture: aggregated._avg.soilMoisture,
        },
        min: {
          temperature: aggregated._min.temperature,
          humidity: aggregated._min.humidity,
          soilMoisture: aggregated._min.soilMoisture,
        },
        max: {
          temperature: aggregated._max.temperature,
          humidity: aggregated._max.humidity,
          soilMoisture: aggregated._max.soilMoisture,
        },
      },
      timeSeries,
      totalRecords: sensorData.length,
    };
  }

  // Legacy method for backward compatibility
  async getStatistics() {
    return this.getOverview();
  }
}

