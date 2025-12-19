import { Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AdminService {
  async createBackup(): Promise<string> {
    const dbPath = join(process.cwd(), 'prisma', 'dev.db');
    const backupDir = join(process.cwd(), 'backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = join(backupDir, `backup-${timestamp}.db`);

    if (!existsSync(dbPath)) {
      throw new Error('Database file not found (Không tìm thấy file database)');
    }

    // Tạo thư mục backups nếu chưa có (Create backups directory if not exists)
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }

    // Copy database file (Copy database file)
    copyFileSync(dbPath, backupPath);

    return backupPath;
  }
}

