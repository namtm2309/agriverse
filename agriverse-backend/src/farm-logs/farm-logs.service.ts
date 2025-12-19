import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebhooksService } from '../webhooks/webhooks.service';

@Injectable()
export class FarmLogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webhooksService: WebhooksService,
  ) {}

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

  async create(data: {
    seasonId: number;
    taskId?: number;
    note: string;
    imageUrl?: string;
  }) {
    const farmLog = await this.prisma.farmLog.create({ data });
    // Gửi webhook event
    this.webhooksService.sendFarmLogCreated(farmLog.id).catch((err) => {
      console.error('Failed to send webhook for farm-log.created:', err);
    });
    return farmLog;
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


