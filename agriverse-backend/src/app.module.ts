import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
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
import { OrderItemsModule } from './order-items/order-items.module';
import { UploadModule } from './upload/upload.module';
import { AdminLogsModule } from './admin-logs/admin-logs.module';
import { HealthModule } from './health/health.module';
import { ExportModule } from './export/export.module';
import { StatisticsModule } from './statistics/statistics.module';
import { BulkModule } from './bulk/bulk.module';
import { AdminModule } from './admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EmailModule } from './email/email.module';
import { SecurityModule } from './security/security.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AdminLogInterceptor } from './common/interceptors/admin-log.interceptor';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';

@Module({
  imports: [
    // Rate Limiting: Giới hạn 100 requests/phút (Rate Limiting: 100 requests/minute)
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 phút (1 minute)
        limit: 100, // 100 requests
      },
    ]),
    ConfigModule,
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
    OrderItemsModule,
    UploadModule,
    AdminLogsModule,
    HealthModule,
    ExportModule,
    StatisticsModule,
    BulkModule,
    AdminModule,
    NotificationsModule,
    WebhooksModule,
    EmailModule,
    SecurityModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AdminLogInterceptor,
    },
  ],
})
export class AppModule {}
