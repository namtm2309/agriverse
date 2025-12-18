import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlotsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.plot.findMany({
      include: { farm: true },
    });
  }

  findOne(id: number) {
    return this.prisma.plot.findUnique({ where: { id }, include: { farm: true } });
  }

  create(data: {
    farmId: number;
    code: string;
    areaSize?: number;
    soilType?: string;
    waterSource?: string;
    gpsPolygon?: string | null;
    status?: string | null;
  }) {
    return this.prisma.plot.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      farmId: number;
      code: string;
      areaSize: number;
      soilType: string;
      waterSource: string;
      gpsPolygon: string | null;
      status: string | null;
    }>,
  ) {
    return this.prisma.plot.update({ where: { id }, data });
  }

  delete(id: number) {
    // Cascade xoá Plot để tránh lỗi khoá ngoại (Season/Task/Log/Harvest/Device/SensorData/NftAsset)
    return this.prisma.$transaction(async (tx) => {
      const seasons = await tx.season.findMany({
        where: { plotId: id },
        select: { id: true },
      });
      const seasonIds = seasons.map((s) => s.id);

      const tasks = await tx.task.findMany({
        where: { seasonId: { in: seasonIds } },
        select: { id: true },
      });
      const taskIds = tasks.map((t) => t.id);

      const devices = await tx.device.findMany({
        where: { plotId: id },
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
        where: { OR: [{ plotId: id }, { seasonId: { in: seasonIds } }] },
      });

      await tx.harvest.deleteMany({ where: { id: { in: harvestIds } } });
      await tx.season.deleteMany({ where: { id: { in: seasonIds } } });

      return tx.plot.delete({ where: { id } });
    });
  }
}


