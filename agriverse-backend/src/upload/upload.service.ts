import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { existsSync, unlinkSync, readdirSync, statSync } from 'fs';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  // Lưu metadata file vào database
  async saveFileMetadata(
    filename: string,
    originalName: string,
    mimeType: string,
    size: number,
    path: string,
    ownerId?: number,
    resourceType?: string,
    resourceId?: number,
  ) {
    return this.prisma.uploadedFile.create({
      data: {
        filename,
        originalName,
        mimeType,
        size,
        path,
        ownerId,
        resourceType,
        resourceId,
      },
    });
  }

  // Lấy danh sách files với metadata
  async getFiles(ownerId?: number, resourceType?: string, resourceId?: number) {
    const where: any = {};
    if (ownerId) where.ownerId = ownerId;
    if (resourceType) where.resourceType = resourceType;
    if (resourceId) where.resourceId = resourceId;

    return this.prisma.uploadedFile.findMany({
      where,
      include: { owner: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Xóa file và metadata
  async deleteFile(fileId: number, ownerId?: number) {
    const file = await this.prisma.uploadedFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new Error('File not found');
    }

    // Kiểm tra quyền (nếu có ownerId)
    if (ownerId && file.ownerId !== ownerId) {
      throw new Error('Unauthorized');
    }

    // Xóa file vật lý
    const filePath = join(__dirname, '..', '..', file.path);
    if (existsSync(filePath)) {
      try {
        unlinkSync(filePath);
      } catch (error) {
        console.error('Error deleting physical file:', error);
      }
    }

    // Xóa metadata
    return this.prisma.uploadedFile.delete({
      where: { id: fileId },
    });
  }

  // Dọn rác: Xóa các file không còn được tham chiếu
  async cleanupOrphanedFiles() {
    const uploadsDir = join(__dirname, '..', '..', 'uploads');
    if (!existsSync(uploadsDir)) {
      return { deleted: 0, errors: [] };
    }

    // Lấy tất cả files trong database
    const dbFiles = await this.prisma.uploadedFile.findMany({
      select: { filename: true, path: true },
    });
    const dbFilenames = new Set(dbFiles.map((f) => f.filename));

    // Lấy tất cả files trong thư mục uploads
    const physicalFiles = readdirSync(uploadsDir);
    const orphanedFiles: string[] = [];
    const errors: string[] = [];

    for (const filename of physicalFiles) {
      if (!dbFilenames.has(filename)) {
        // File không có trong database -> orphaned
        const filePath = join(uploadsDir, filename);
        try {
          unlinkSync(filePath);
          orphanedFiles.push(filename);
        } catch (error: any) {
          errors.push(`Failed to delete ${filename}: ${error.message}`);
        }
      }
    }

    return {
      deleted: orphanedFiles.length,
      files: orphanedFiles,
      errors,
    };
  }

  // Lấy thống kê storage
  async getStorageStats() {
    const files = await this.prisma.uploadedFile.findMany({
      select: { size: true, mimeType: true },
    });

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const byType = files.reduce((acc, f) => {
      const type = f.mimeType.split('/')[0]; // image, application, etc.
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalFiles: files.length,
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      byType,
    };
  }
}

