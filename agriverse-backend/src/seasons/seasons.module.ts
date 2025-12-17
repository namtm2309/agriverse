import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';

@Module({
  imports: [PrismaModule],
  providers: [SeasonsService],
  controllers: [SeasonsController],
})
export class SeasonsModule {}


