import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.adminLog.findMany({
      include: { admin: true },
    });
  }

  findOne(id: number) {
    return this.prisma.adminLog.findUnique({
      where: { id },
      include: { admin: true },
    });
  }

  create(data: {
    adminId: number;
    action: string;
    targetType: string;
    targetId?: number;
  }) {
    return this.prisma.adminLog.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      adminId: number;
      action: string;
      targetType: string;
      targetId: number;
    }>,
  ) {
    return this.prisma.adminLog.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.adminLog.delete({ where: { id } });
  }
}


