import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FarmLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.farmLog.findMany({
      include: { season: true, task: true },
    });
  }

  findOne(id: number) {
    return this.prisma.farmLog.findUnique({
      where: { id },
      include: { season: true, task: true },
    });
  }

  create(data: {
    seasonId: number;
    taskId?: number;
    note: string;
    imageUrl?: string;
  }) {
    return this.prisma.farmLog.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      seasonId: number;
      taskId: number;
      note: string;
      imageUrl: string;
    }>,
  ) {
    return this.prisma.farmLog.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.farmLog.delete({ where: { id } });
  }
}


