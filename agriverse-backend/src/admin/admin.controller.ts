import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('backup')
  async backup(@Res() res: Response) {
    const backupPath = await this.adminService.createBackup();
    
    if (!existsSync(backupPath)) {
      return res.status(404).json({
        message: 'Backup file not found (Không tìm thấy file backup)',
      });
    }

    const filename = `agriverse-backup-${new Date().toISOString().split('T')[0]}.db`;
    const fileBuffer = readFileSync(backupPath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    return res.send(fileBuffer);
  }
}

