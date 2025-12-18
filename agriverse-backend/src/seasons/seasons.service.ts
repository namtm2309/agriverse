import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.season.findMany({
      include: { plot: true, crop: true },
    });
  }

  findOne(id: number) {
    return this.prisma.season.findUnique({
      where: { id },
      include: { plot: true, crop: true },
    });
  }

  create(data: {
    plotId: number;
    cropId: number;
    startDate: Date;
    expectedHarvestDate?: Date;
    expectedYield?: number;
    status?: string | null;
  }) {
    return this.prisma.season.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      plotId: number;
      cropId: number;
      startDate: Date;
      expectedHarvestDate: Date;
      expectedYield: number;
      status: string | null;
    }>,
  ) {
    return this.prisma.season.update({ where: { id }, data });
  }

  delete(id: number) {
    // Cascade xoá Season để tránh lỗi khoá ngoại (Task/Log/Harvest/ProductBatch/OrderItem/NftAsset)
    return this.prisma.$transaction(async (tx) => {
      const tasks = await tx.task.findMany({
        where: { seasonId: id },
        select: { id: true },
      });
      const taskIds = tasks.map((t) => t.id);

      const harvests = await tx.harvest.findMany({
        where: { seasonId: id },
        select: { id: true },
      });
      const harvestIds = harvests.map((h) => h.id);

      const productBatches = await tx.productBatch.findMany({
        where: { harvestId: { in: harvestIds } },
        select: { id: true },
      });
      const productBatchIds = productBatches.map((pb) => pb.id);

      await tx.orderItem.deleteMany({
        where: { productBatchId: { in: productBatchIds } },
      });
      await tx.productBatch.deleteMany({ where: { id: { in: productBatchIds } } });

      await tx.farmLog.deleteMany({
        where: { OR: [{ seasonId: id }, { taskId: { in: taskIds } }] },
      });
      await tx.task.deleteMany({ where: { id: { in: taskIds } } });

      await tx.nftAsset.deleteMany({ where: { seasonId: id } });
      await tx.harvest.deleteMany({ where: { id: { in: harvestIds } } });

      return tx.season.delete({ where: { id } });
    });
  }
}


