import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  // Tạo webhook mới
  async createWebhook(url: string, events: string[], secret?: string) {
    if (!url || !events || events.length === 0) {
      throw new BadRequestException('URL and events are required');
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      throw new BadRequestException('Invalid URL format');
    }

    // Generate secret nếu không có
    const webhookSecret = secret || crypto.randomBytes(32).toString('hex');

    return this.prisma.webhook.create({
      data: {
        url,
        events: JSON.stringify(events),
        secret: webhookSecret,
        active: true,
      },
    });
  }

  // Lấy danh sách webhooks
  async getAllWebhooks() {
    const webhooks = await this.prisma.webhook.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return webhooks.map((w) => ({
      ...w,
      events: JSON.parse(w.events),
    }));
  }

  // Lấy webhook theo ID
  async getWebhookById(id: number) {
    const webhook = await this.prisma.webhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      throw new BadRequestException(`Webhook with ID ${id} not found`);
    }

    return {
      ...webhook,
      events: JSON.parse(webhook.events),
    };
  }

  // Cập nhật webhook
  async updateWebhook(
    id: number,
    url?: string,
    events?: string[],
    active?: boolean,
  ) {
    const updateData: any = {};
    if (url !== undefined) {
      try {
        new URL(url);
        updateData.url = url;
      } catch {
        throw new BadRequestException('Invalid URL format');
      }
    }
    if (events !== undefined) {
      updateData.events = JSON.stringify(events);
    }
    if (active !== undefined) {
      updateData.active = active;
    }

    return this.prisma.webhook.update({
      where: { id },
      data: updateData,
    });
  }

  // Xóa webhook
  async deleteWebhook(id: number) {
    return this.prisma.webhook.delete({
      where: { id },
    });
  }

  // Gửi webhook event
  async sendWebhookEvent(eventType: string, payload: any) {
    const webhooks = await this.prisma.webhook.findMany({
      where: {
        active: true,
      },
    });

    const results = await Promise.allSettled(
      webhooks.map(async (webhook) => {
        const events: string[] = JSON.parse(webhook.events);
        if (!events.includes(eventType) && !events.includes('*')) {
          return { webhookId: webhook.id, skipped: true };
        }

        try {
          // Tạo signature
          const signature = webhook.secret
            ? crypto
                .createHmac('sha256', webhook.secret)
                .update(JSON.stringify(payload))
                .digest('hex')
            : null;

          // Gửi webhook
          const response = await axios.post(
            webhook.url,
            {
              event: eventType,
              data: payload,
              timestamp: new Date().toISOString(),
            },
            {
              headers: {
                'Content-Type': 'application/json',
                ...(signature && { 'X-Webhook-Signature': signature }),
              },
              timeout: 10000, // 10 seconds timeout
            },
          );

          return {
            webhookId: webhook.id,
            url: webhook.url,
            status: response.status,
            success: true,
          };
        } catch (error: any) {
          return {
            webhookId: webhook.id,
            url: webhook.url,
            success: false,
            error: error.message,
          };
        }
      }),
    );

    return results.map((r) => r.status === 'fulfilled' ? r.value : r.reason);
  }

  // Helper methods để gửi các loại events cụ thể
  async sendFarmLogCreated(farmLogId: number) {
    const farmLog = await this.prisma.farmLog.findUnique({
      where: { id: farmLogId },
      include: {
        season: { include: { crop: true, plot: { include: { farm: true } } } },
        task: true,
      },
    });

    if (!farmLog) return;

    return this.sendWebhookEvent('farm-log.created', {
      id: farmLog.id,
      seasonId: farmLog.seasonId,
      taskId: farmLog.taskId,
      note: farmLog.note,
      imageUrl: farmLog.imageUrl,
      createdAt: farmLog.createdAt,
      season: farmLog.season,
      task: farmLog.task,
    });
  }

  async sendHarvestCreated(harvestId: number) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id: harvestId },
      include: {
        season: {
          include: { crop: true, plot: { include: { farm: true } } },
        },
        productBatches: true,
      },
    });

    if (!harvest) return;

    return this.sendWebhookEvent('harvest.created', {
      id: harvest.id,
      seasonId: harvest.seasonId,
      harvestDate: harvest.harvestDate,
      actualYield: harvest.actualYield,
      qualityNote: harvest.qualityNote,
      createdAt: harvest.createdAt,
      season: harvest.season,
      productBatches: harvest.productBatches,
    });
  }

  async sendOrderCreated(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        items: { include: { productBatch: true } },
      },
    });

    if (!order) return;

    return this.sendWebhookEvent('order.created', {
      id: order.id,
      buyerId: order.buyerId,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
      buyer: order.buyer,
      items: order.items,
    });
  }

  async sendOrderUpdated(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        items: { include: { productBatch: true } },
      },
    });

    if (!order) return;

    return this.sendWebhookEvent('order.updated', {
      id: order.id,
      buyerId: order.buyerId,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status,
      updatedAt: order.updatedAt,
      buyer: order.buyer,
      items: order.items,
    });
  }
}

