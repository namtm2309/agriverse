import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductBatchesService } from './product-batches.service';
import { ProductBatchesController } from './product-batches.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProductBatchesService],
  controllers: [ProductBatchesController],
})
export class ProductBatchesModule {}


