import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebhooksService } from '../webhooks/webhooks.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooksService: WebhooksService,
  ) {}

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

  async create(data: {
    buyerId: number;
    totalAmount?: number;
    paymentMethod?: string;
    status: string;
  }) {
    const order = await this.prisma.order.create({ data });
    // Gửi webhook event
    this.webhooksService.sendOrderCreated(order.id).catch((err) => {
      console.error('Failed to send webhook for order.created:', err);
    });
    return order;
  }

  async update(
    id: number,
    data: Partial<{
      buyerId: number;
      totalAmount: number;
      paymentMethod: string;
      status: string;
    }>,
  ) {
    const order = await this.prisma.order.update({ where: { id }, data });
    // Gửi webhook event
    this.webhooksService.sendOrderUpdated(order.id).catch((err) => {
      console.error('Failed to send webhook for order.updated:', err);
    });
    return order;
  }

  delete(id: number) {
    // Cascade xoá Order để tránh lỗi khoá ngoại (OrderItem)
    return this.prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({ where: { orderId: id } });
      return tx.order.delete({ where: { id } });
    });
  }
}


