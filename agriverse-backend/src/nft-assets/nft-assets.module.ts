import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NftAssetsService } from './nft-assets.service';
import { NftAssetsController } from './nft-assets.controller';

@Module({
  imports: [PrismaModule],
  providers: [NftAssetsService],
  controllers: [NftAssetsController],
})
export class NftAssetsModule {}


