import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { FarmsModule } from './farms/farms.module';
import { PlotsModule } from './plots/plots.module';
import { CropsModule } from './crops/crops.module';
import { SeasonsModule } from './seasons/seasons.module';
import { TasksModule } from './tasks/tasks.module';
import { FarmLogsModule } from './farm-logs/farm-logs.module';
import { DevicesModule } from './devices/devices.module';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { HarvestsModule } from './harvests/harvests.module';
import { ProductBatchesModule } from './product-batches/product-batches.module';
import { NftAssetsModule } from './nft-assets/nft-assets.module';
import { OrdersModule } from './orders/orders.module';
import { AdminLogsModule } from './admin-logs/admin-logs.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    AreasModule,
    FarmsModule,
    PlotsModule,
    CropsModule,
    SeasonsModule,
    TasksModule,
    FarmLogsModule,
    DevicesModule,
    SensorDataModule,
    HarvestsModule,
    ProductBatchesModule,
    NftAssetsModule,
    OrdersModule,
    AdminLogsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}



