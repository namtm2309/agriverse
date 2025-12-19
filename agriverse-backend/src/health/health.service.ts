import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    const checks = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: await this.checkDatabase(),
      disk: this.checkDiskSpace(),
    };

    // Nếu có lỗi, đổi status thành 'error'
    if (checks.database.status !== 'ok' || checks.disk.status !== 'ok') {
      checks.status = 'error';
    }

    return checks;
  }

  private async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        message: 'Database connection successful (Kết nối database thành công)',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed (Kết nối database thất bại)',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private checkDiskSpace() {
    try {
      const dbPath = join(process.cwd(), 'prisma', 'dev.db');
      if (existsSync(dbPath)) {
        const stats = statSync(dbPath);
        const sizeMB = stats.size / (1024 * 1024);
        return {
          status: 'ok',
          message: 'Disk space available (Dung lượng đĩa khả dụng)',
          databaseSizeMB: Math.round(sizeMB * 100) / 100,
        };
      }
      return {
        status: 'warning',
        message: 'Database file not found (Không tìm thấy file database)',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Disk check failed (Kiểm tra đĩa thất bại)',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

