import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BulkService {
  constructor(private readonly prisma: PrismaService) {}

  // Map resource names to Prisma models (Map tên resource sang Prisma models)
  private readonly resourceMap: Record<string, string> = {
    users: 'user',
    areas: 'area',
    farms: 'farm',
    plots: 'plot',
    crops: 'crop',
    seasons: 'season',
    tasks: 'task',
    'farm-logs': 'farmLog',
    devices: 'device',
    'sensor-data': 'sensorData',
    harvests: 'harvest',
    'product-batches': 'productBatch',
    'nft-assets': 'nftAsset',
    orders: 'order',
    'order-items': 'orderItem',
  };

  async bulkDelete(resource: string, ids: number[]) {
    const modelName = this.resourceMap[resource];
    if (!modelName) {
      throw new NotFoundException(`Resource "${resource}" not found (Không tìm thấy resource "${resource}")`);
    }

    if (!ids || ids.length === 0) {
      throw new BadRequestException('Danh sách ID không được rỗng (ID list cannot be empty)');
    }

    try {
      const result = await (this.prisma as any)[modelName].deleteMany({
        where: {
          id: { in: ids },
        },
      });

      return {
        message: `Đã xóa ${result.count} bản ghi (Deleted ${result.count} records)`,
        deletedCount: result.count,
      };
    } catch (error) {
      throw new BadRequestException(
        `Lỗi khi xóa: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async bulkUpdate(resource: string, ids: number[], data: Record<string, any>) {
    const modelName = this.resourceMap[resource];
    if (!modelName) {
      throw new NotFoundException(`Resource "${resource}" not found (Không tìm thấy resource "${resource}")`);
    }

    if (!ids || ids.length === 0) {
      throw new BadRequestException('Danh sách ID không được rỗng (ID list cannot be empty)');
    }

    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Dữ liệu cập nhật không được rỗng (Update data cannot be empty)');
    }

    try {
      const result = await (this.prisma as any)[modelName].updateMany({
        where: {
          id: { in: ids },
        },
        data: data,
      });

      return {
        message: `Đã cập nhật ${result.count} bản ghi (Updated ${result.count} records)`,
        updatedCount: result.count,
      };
    } catch (error) {
      throw new BadRequestException(
        `Lỗi khi cập nhật: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}

