import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.task.findMany({
      include: { season: true },
    });
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { season: true },
    });
  }

  create(data: {
    seasonId: number;
    title: string;
    description?: string;
    dueDate?: Date;
    taskType?: string;
    status?: string;
  }) {
    return this.prisma.task.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      seasonId: number;
      title: string;
      description: string;
      dueDate: Date;
      taskType: string;
      status: string;
    }>,
  ) {
    return this.prisma.task.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}


