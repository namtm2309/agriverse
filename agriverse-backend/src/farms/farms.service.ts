import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.farm.findMany({
      include: {
        area: true,
        owner: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.farm.findUnique({
      where: { id },
      include: { area: true, owner: true },
    });
  }

  create(data: { name: string; areaId: number; ownerId?: number | null }) {
    return this.prisma.farm.create({ data });
  }

  update(
    id: number,
    data: { name?: string; areaId?: number; ownerId?: number | null },
  ) {
    return this.prisma.farm.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    // Cascade xoá Farm để tránh lỗi khoá ngoại (Plot/Season/Task/Log/Harvest/...)
    return this.prisma.$transaction(async (tx) => {
      const plots = await tx.plot.findMany({
        where: { farmId: id },
        select: { id: true },
      });
      const plotIds = plots.map((p) => p.id);

      const seasons = await tx.season.findMany({
        where: { plotId: { in: plotIds } },
        select: { id: true },
      });
      const seasonIds = seasons.map((s) => s.id);

      const tasks = await tx.task.findMany({
        where: { seasonId: { in: seasonIds } },
        select: { id: true },
      });
      const taskIds = tasks.map((t) => t.id);

      const devices = await tx.device.findMany({
        where: { plotId: { in: plotIds } },
        select: { id: true },
      });
      const deviceIds = devices.map((d) => d.id);

      const harvests = await tx.harvest.findMany({
        where: { seasonId: { in: seasonIds } },
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

      await tx.sensorData.deleteMany({ where: { deviceId: { in: deviceIds } } });
      await tx.device.deleteMany({ where: { id: { in: deviceIds } } });

      await tx.farmLog.deleteMany({
        where: {
          OR: [{ seasonId: { in: seasonIds } }, { taskId: { in: taskIds } }],
        },
      });

      await tx.task.deleteMany({ where: { id: { in: taskIds } } });

      await tx.nftAsset.deleteMany({
        where: {
          OR: [{ farmId: id }, { plotId: { in: plotIds } }, { seasonId: { in: seasonIds } }],
        },
      });

      await tx.harvest.deleteMany({ where: { id: { in: harvestIds } } });
      await tx.season.deleteMany({ where: { id: { in: seasonIds } } });
      await tx.plot.deleteMany({ where: { id: { in: plotIds } } });

      return tx.farm.delete({ where: { id } });
    });
  }
}


