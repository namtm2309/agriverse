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
    return this.prisma.plot.delete({ where: { id } });
  }
}


