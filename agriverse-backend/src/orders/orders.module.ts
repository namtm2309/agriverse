import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [PrismaModule, WebhooksModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}


