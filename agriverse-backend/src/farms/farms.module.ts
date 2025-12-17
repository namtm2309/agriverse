import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';

@Module({
  imports: [PrismaModule],
  providers: [FarmsService],
  controllers: [FarmsController],
})
export class FarmsModule {}


