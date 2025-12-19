import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Dashboard Overview - Tổng quan
  @Get('overview')
  async getOverview() {
    return this.statisticsService.getOverview();
  }

  // Legacy endpoint for backward compatibility
  @Get()
  async getStatistics() {
    return this.statisticsService.getStatistics();
  }

  // Season Analytics - Phân tích mùa vụ
  @Get('seasons')
  async getSeasonAnalytics(
    @Query('seasonId') seasonId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.statisticsService.getSeasonAnalytics(
      seasonId ? parseInt(seasonId, 10) : undefined,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  // Task Analytics - Phân tích công việc
  @Get('tasks')
  async getTaskAnalytics(
    @Query('seasonId') seasonId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.statisticsService.getTaskAnalytics(
      seasonId ? parseInt(seasonId, 10) : undefined,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  // Farm Logs Analytics - Phân tích nhật ký canh tác
  @Get('farm-logs')
  async getFarmLogsAnalytics(
    @Query('seasonId') seasonId?: string,
    @Query('taskId') taskId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.statisticsService.getFarmLogsAnalytics(
      seasonId ? parseInt(seasonId, 10) : undefined,
      taskId ? parseInt(taskId, 10) : undefined,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  // Sensor Data Analytics - Phân tích dữ liệu cảm biến
  @Get('sensors')
  async getSensorDataAnalytics(
    @Query('deviceId') deviceId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.statisticsService.getSensorDataAnalytics(
      deviceId ? parseInt(deviceId, 10) : undefined,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }
}

