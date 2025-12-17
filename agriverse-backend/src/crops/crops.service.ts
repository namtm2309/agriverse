import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CropsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.crop.findMany();
  }

  findOne(id: number) {
    return this.prisma.crop.findUnique({ where: { id } });
  }

  create(data: {
    name: string;
    variety?: string;
    growthDays?: number;
    tempMin?: number;
    tempMax?: number;
    humidityMin?: number;
    humidityMax?: number;
  }) {
    return this.prisma.crop.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      name: string;
      variety: string;
      growthDays: number;
      tempMin: number;
      tempMax: number;
      humidityMin: number;
      humidityMax: number;
    }>,
  ) {
    return this.prisma.crop.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.crop.delete({ where: { id } });
  }
}


