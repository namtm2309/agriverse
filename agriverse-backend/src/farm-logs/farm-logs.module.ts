import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { FarmLogsService } from './farm-logs.service';
import { FarmLogsController } from './farm-logs.controller';

@Module({
  imports: [PrismaModule, WebhooksModule],
  providers: [FarmLogsService],
  controllers: [FarmLogsController],
})
export class FarmLogsModule {}


