import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FarmLogsService } from './farm-logs.service';
import { FarmLogsController } from './farm-logs.controller';

@Module({
  imports: [PrismaModule],
  providers: [FarmLogsService],
  controllers: [FarmLogsController],
})
export class FarmLogsModule {}


