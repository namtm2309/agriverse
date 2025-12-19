import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.orderItem.findMany({
      include: { order: true, productBatch: true },
    });
  }

  findOne(id: number) {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: { order: true, productBatch: true },
    });
  }

  create(data: {
    orderId: number;
    productBatchId: number;
    quantity: number;
    price: number;
  }) {
    return this.prisma.orderItem.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      orderId: number;
      productBatchId: number;
      quantity: number;
      price: number;
    }>,
  ) {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}

