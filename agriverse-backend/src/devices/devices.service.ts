import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.device.findMany({
      include: { plot: true },
    });
  }

  findOne(id: number) {
    return this.prisma.device.findUnique({
      where: { id },
      include: { plot: true },
    });
  }

  create(data: {
    plotId?: number;
    name: string;
    deviceType?: string;
    status?: string;
  }) {
    return this.prisma.device.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      plotId: number;
      name: string;
      deviceType: string;
      status: string;
    }>,
  ) {
    return this.prisma.device.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.device.delete({ where: { id } });
  }
}


