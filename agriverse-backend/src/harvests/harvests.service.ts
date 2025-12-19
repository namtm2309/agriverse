import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebhooksService } from '../webhooks/webhooks.service';

@Injectable()
export class HarvestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooksService: WebhooksService,
  ) {}

  findAll() {
    return this.prisma.harvest.findMany({
      include: { season: true },
    });
  }

  findOne(id: number) {
    return this.prisma.harvest.findUnique({
      where: { id },
      include: { season: true },
    });
  }

  async create(data: {
    seasonId: number;
    harvestDate?: Date;
    actualYield?: number;
    qualityNote?: string;
  }) {
    const harvest = await this.prisma.harvest.create({ data });
    // Gửi webhook event
    this.webhooksService.sendHarvestCreated(harvest.id).catch((err) => {
      console.error('Failed to send webhook for harvest.created:', err);
    });
    return harvest;
  }

  update(
    id: number,
    data: Partial<{
      seasonId: number;
      harvestDate: Date;
      actualYield: number;
      qualityNote: string;
    }>,
  ) {
    return this.prisma.harvest.update({ where: { id }, data });
  }

  delete(id: number) {
    // Cascade xoá Harvest để tránh lỗi khoá ngoại (ProductBatch/OrderItem)
    return this.prisma.$transaction(async (tx) => {
      const productBatches = await tx.productBatch.findMany({
        where: { harvestId: id },
        select: { id: true },
      });
      const productBatchIds = productBatches.map((pb) => pb.id);

      await tx.orderItem.deleteMany({
        where: { productBatchId: { in: productBatchIds } },
      });
      await tx.productBatch.deleteMany({ where: { id: { in: productBatchIds } } });

      return tx.harvest.delete({ where: { id } });
    });
  }
}


