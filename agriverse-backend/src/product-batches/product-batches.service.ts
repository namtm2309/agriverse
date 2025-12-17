import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductBatchesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productBatch.findMany({
      include: { harvest: true },
    });
  }

  findOne(id: number) {
    return this.prisma.productBatch.findUnique({
      where: { id },
      include: { harvest: true },
    });
  }

  create(data: {
    harvestId: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    qrCode?: string;
    status?: string;
  }) {
    return this.prisma.productBatch.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      harvestId: number;
      name: string;
      quantity: number;
      unit: string;
      price: number;
      qrCode: string;
      status: string;
    }>,
  ) {
    return this.prisma.productBatch.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.productBatch.delete({ where: { id } });
  }
}


