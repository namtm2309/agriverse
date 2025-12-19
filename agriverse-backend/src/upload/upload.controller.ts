import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import type { Request as ExpressRequest } from 'express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: ExpressRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req: ExpressRequest, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
        // Chỉ cho phép ảnh (Only allow images)
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException(
              'Chỉ chấp nhận file ảnh (Only image files are allowed)',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Request() req: any,
    @Query('resourceType') resourceType?: string,
    @Query('resourceId') resourceId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Không có file được tải lên (No file uploaded)');
    }

    // Lưu metadata vào database
    const userId = req.user?.userId;
    const fileRecord = await this.uploadService.saveFileMetadata(
      file.filename,
      file.originalname,
      file.mimetype,
      file.size,
      `uploads/${file.filename}`,
      userId,
      resourceType,
      resourceId ? parseInt(resourceId, 10) : undefined,
    );

    return {
      message: 'Tải lên thành công (Upload successful)',
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      id: fileRecord.id,
    };
  }

  // Upload file đa dạng (documents, etc.)
  @Post('file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: ExpressRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )
  async uploadAnyFile(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Request() req: any,
    @Query('resourceType') resourceType?: string,
    @Query('resourceId') resourceId?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Không có file được tải lên (No file uploaded)');
    }

    const userId = req.user?.userId;
    const fileRecord = await this.uploadService.saveFileMetadata(
      file.filename,
      file.originalname,
      file.mimetype,
      file.size,
      `uploads/${file.filename}`,
      userId,
      resourceType,
      resourceId ? parseInt(resourceId, 10) : undefined,
    );

    return {
      message: 'Tải lên thành công (Upload successful)',
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      id: fileRecord.id,
    };
  }

  // Lấy danh sách files
  @Get('files')
  @UseGuards(JwtAuthGuard)
  async getFiles(
    @Query('ownerId') ownerId?: string,
    @Query('resourceType') resourceType?: string,
    @Query('resourceId') resourceId?: string,
  ) {
    return this.uploadService.getFiles(
      ownerId ? parseInt(ownerId, 10) : undefined,
      resourceType,
      resourceId ? parseInt(resourceId, 10) : undefined,
    );
  }

  // Thống kê storage
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getStorageStats() {
    return this.uploadService.getStorageStats();
  }

  // Dọn rác files
  @Post('cleanup')
  @UseGuards(JwtAuthGuard)
  async cleanupOrphanedFiles() {
    return this.uploadService.cleanupOrphanedFiles();
  }

  @Delete('image/:filename')
  deleteFile(@Param('filename') filename: string) {
    console.log('UploadController: DELETE request received for filename:', filename);
    
    // Bảo mật: Chỉ cho phép xóa file trong thư mục uploads (Security: Only allow deleting files in uploads directory)
    // Loại bỏ các ký tự nguy hiểm như .., /, \ (Remove dangerous characters like .., /, \)
    // Lưu ý: decode filename vì frontend đã encode (Note: decode filename because frontend already encoded)
    const decodedFilename = decodeURIComponent(filename);
    const safeFilename = decodedFilename.replace(/[^a-zA-Z0-9._-]/g, '');
    
    console.log('UploadController: Decoded filename:', decodedFilename);
    console.log('UploadController: Safe filename:', safeFilename);
    
    if (!safeFilename || safeFilename !== decodedFilename) {
      console.error('UploadController: Invalid filename detected');
      throw new BadRequestException('Tên file không hợp lệ (Invalid filename)');
    }

    const filePath = join(__dirname, '..', 'uploads', safeFilename);
    console.log('UploadController: File path:', filePath);

    // Kiểm tra file có tồn tại không (Check if file exists)
    if (!existsSync(filePath)) {
      console.error('UploadController: File not found at path:', filePath);
      throw new NotFoundException('Không tìm thấy file (File not found)');
    }

    try {
      // Xóa file (Delete file)
      console.log('UploadController: Attempting to delete file:', filePath);
      unlinkSync(filePath);
      console.log('UploadController: File deleted successfully');
      return {
        message: 'Đã xóa file thành công (File deleted successfully)',
        filename: safeFilename,
      };
    } catch (error) {
      console.error('UploadController: Error deleting file:', error);
      throw new BadRequestException(
        `Lỗi khi xóa file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

