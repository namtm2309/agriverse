import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HarvestsService } from './harvests.service';
import { HarvestsController } from './harvests.controller';

@Module({
  imports: [PrismaModule],
  providers: [HarvestsService],
  controllers: [HarvestsController],
})
export class HarvestsModule {}


