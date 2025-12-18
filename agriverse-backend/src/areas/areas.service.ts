import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.area.findMany();
  }

  findOne(id: number) {
    return this.prisma.area.findUnique({ where: { id } });
  }

  create(data: { name: string }) {
    return this.prisma.area.create({ data });
  }

  update(id: number, data: { name?: string }) {
    return this.prisma.area.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    // Xoá cascade theo cây phụ thuộc để tránh lỗi khoá ngoại khi xoá Area.
    // Area -> Farms -> Plots -> Seasons -> (Tasks, FarmLogs, Harvests, ProductBatches) + Devices/SensorData + NftAssets.
    return this.prisma.$transaction(async (tx) => {
      const farms = await tx.farm.findMany({
        where: { areaId: id },
        select: { id: true },
      });
      const farmIds = farms.map((f) => f.id);

      const plots = await tx.plot.findMany({
        where: { farmId: { in: farmIds } },
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

      // Delete in safe order
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
          OR: [
            { farmId: { in: farmIds } },
            { plotId: { in: plotIds } },
            { seasonId: { in: seasonIds } },
          ],
        },
      });

      await tx.harvest.deleteMany({ where: { id: { in: harvestIds } } });
      await tx.season.deleteMany({ where: { id: { in: seasonIds } } });
      await tx.plot.deleteMany({ where: { id: { in: plotIds } } });
      await tx.farm.deleteMany({ where: { id: { in: farmIds } } });

      // 1) Bỏ liên kết parent cho các area con (nếu có)
      await tx.area.updateMany({
        where: { parentId: id },
        data: { parentId: null },
      });

      // 2) Xoá chính area
      return tx.area.delete({ where: { id } });
    });
  }
}


