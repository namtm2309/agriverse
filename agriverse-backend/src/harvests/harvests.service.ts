import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HarvestsService {
  constructor(private readonly prisma: PrismaService) {}

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

  create(data: {
    seasonId: number;
    harvestDate?: Date;
    actualYield?: number;
    qualityNote?: string;
  }) {
    return this.prisma.harvest.create({ data });
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
    return this.prisma.harvest.delete({ where: { id } });
  }
}


