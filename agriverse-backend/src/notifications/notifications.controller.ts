import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateNotificationDto {
  userId!: number;
  type!: string;
  title!: string;
  message!: string;
  link?: string;
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Lấy danh sách notifications của user hiện tại
  @Get()
  async getUserNotifications(@Request() req: any, @Query('read') read?: string) {
    const userId = req.user.userId;
    const readFilter = read === 'true' ? true : read === 'false' ? false : undefined;
    return this.notificationsService.getUserNotifications(userId, readFilter);
  }

  // Đếm số notifications chưa đọc
  @Get('unread-count')
  async getUnreadCount(@Request() req: any) {
    const userId = req.user.userId;
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  // Tạo notification (admin only - có thể thêm role guard sau)
  @Post()
  async createNotification(@Body() body: CreateNotificationDto) {
    return this.notificationsService.createNotification(
      body.userId,
      body.type,
      body.title,
      body.message,
      body.link,
    );
  }

  // Đánh dấu notification là đã đọc
  @Put(':id/read')
  async markAsRead(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.markAsRead(parseInt(id, 10), userId);
  }

  // Đánh dấu tất cả notifications là đã đọc
  @Put('read-all')
  async markAllAsRead(@Request() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.markAllAsRead(userId);
  }

  // Xóa notification
  @Delete(':id')
  async deleteNotification(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.notificationsService.deleteNotification(parseInt(id, 10), userId);
  }
}

