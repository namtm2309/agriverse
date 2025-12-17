import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CropsService } from './crops.service';
import { CropsController } from './crops.controller';

@Module({
  imports: [PrismaModule],
  providers: [CropsService],
  controllers: [CropsController],
})
export class CropsModule {}


