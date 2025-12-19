import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  // Tạo notification mới
  async createNotification(
    userId: number,
    type: string,
    title: string,
    message: string,
    link?: string,
  ) {
    return this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });
  }

  // Lấy danh sách notifications của user
  async getUserNotifications(userId: number, read?: boolean) {
    const where: any = { userId };
    if (read !== undefined) {
      where.read = read;
    }

    return this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Đánh dấu notification là đã đọc
  async markAsRead(notificationId: number, userId: number) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId, // Đảm bảo user chỉ có thể đánh dấu notification của chính mình
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });
  }

  // Đánh dấu tất cả notifications là đã đọc
  async markAllAsRead(userId: number) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });
  }

  // Xóa notification
  async deleteNotification(notificationId: number, userId: number) {
    return this.prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId,
      },
    });
  }

  // Đếm số notifications chưa đọc
  async getUnreadCount(userId: number) {
    return this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }

  // Tạo notification tự động từ events
  async createTaskDueNotification(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { season: { include: { plot: { include: { farm: true } } } } },
    });

    if (!task) return null;

    return this.createNotification(
      userId,
      'TASK_DUE',
      `Task sắp đến hạn: ${task.title}`,
      `Task "${task.title}" có hạn vào ${task.dueDate?.toLocaleDateString('vi-VN')}`,
      `/tasks/${taskId}`,
    );
  }

  async createSensorAlertNotification(
    deviceId: number,
    userId: number,
    alertType: string,
    message: string,
  ) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
      include: { plot: { include: { farm: true } } },
    });

    if (!device) return null;

    return this.createNotification(
      userId,
      'SENSOR_ALERT',
      `Cảnh báo cảm biến: ${device.name}`,
      message,
      `/devices/${deviceId}`,
    );
  }

  async createOrderNotification(orderId: number, userId: number, type: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) return null;

    const titles: Record<string, string> = {
      ORDER_NEW: 'Đơn hàng mới',
      ORDER_COMPLETED: 'Đơn hàng đã hoàn thành',
      ORDER_CANCELLED: 'Đơn hàng đã hủy',
    };

    return this.createNotification(
      userId,
      type,
      titles[type] || 'Thông báo đơn hàng',
      `Đơn hàng #${orderId} có cập nhật mới`,
      `/orders/${orderId}`,
    );
  }

  async createHarvestReadyNotification(harvestId: number, userId: number) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id: harvestId },
      include: { season: { include: { crop: true } } },
    });

    if (!harvest) return null;

    return this.createNotification(
      userId,
      'HARVEST_READY',
      'Thu hoạch sẵn sàng',
      `Mùa vụ ${harvest.season.crop.name} đã sẵn sàng thu hoạch`,
      `/harvests/${harvestId}`,
    );
  }
}

