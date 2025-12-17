import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';

@Module({
  imports: [PrismaModule],
  providers: [SensorDataService],
  controllers: [SensorDataController],
})
export class SensorDataModule {}


