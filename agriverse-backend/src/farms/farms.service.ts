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
    return this.prisma.farm.delete({ where: { id } });
  }
}


