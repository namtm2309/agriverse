import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminLogsService } from './admin-logs.service';
import { AdminLogsController } from './admin-logs.controller';

@Module({
  imports: [PrismaModule],
  providers: [AdminLogsService],
  controllers: [AdminLogsController],
})
export class AdminLogsModule {}


