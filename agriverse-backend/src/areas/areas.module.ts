import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';

@Module({
  imports: [PrismaModule],
  providers: [AreasService],
  controllers: [AreasController],
})
export class AreasModule {}


