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
    return this.prisma.season.delete({ where: { id } });
  }
}


