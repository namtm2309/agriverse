import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order.findMany({
      include: { buyer: true, items: { include: { productBatch: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { buyer: true, items: { include: { productBatch: true } } },
    });
  }

  create(data: {
    buyerId: number;
    totalAmount?: number;
    paymentMethod?: string;
    status: string;
  }) {
    return this.prisma.order.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      buyerId: number;
      totalAmount: number;
      paymentMethod: string;
      status: string;
    }>,
  ) {
    return this.prisma.order.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}


