import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NftAssetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.nftAsset.findMany({
      include: { farm: true, plot: true, season: true, ownerUser: true },
    });
  }

  findOne(id: number) {
    return this.prisma.nftAsset.findUnique({
      where: { id },
      include: { farm: true, plot: true, season: true, ownerUser: true },
    });
  }

  create(data: {
    type: string;
    farmId?: number;
    plotId?: number;
    seasonId?: number;
    ownerUserId?: number;
    benefitDescription?: string;
    expectedYield?: number;
    status?: string;
  }) {
    return this.prisma.nftAsset.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      type: string;
      farmId: number;
      plotId: number;
      seasonId: number;
      ownerUserId: number;
      benefitDescription: string;
      expectedYield: number;
      status: string;
    }>,
  ) {
    return this.prisma.nftAsset.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.nftAsset.delete({ where: { id } });
  }
}


