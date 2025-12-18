import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NftAssetsService } from './nft-assets.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateNftAssetDto {
  type!: string;
  farmId?: number;
  plotId?: number;
  seasonId?: number;
  ownerUserId?: number;
  benefitDescription?: string;
  expectedYield?: number;
  status?: string;
}

class UpdateNftAssetDto extends CreateNftAssetDto {}

@Controller('nft-assets')
export class NftAssetsController {
  constructor(private readonly nftAssetsService: NftAssetsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.nftAssetsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [
      'type',
      'benefitDescription',
      'status',
    ] as any);
    setContentRange(res, 'nft-assets', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nftAssetsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateNftAssetDto) {
    return this.nftAssetsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNftAssetDto,
  ) {
    return this.nftAssetsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nftAssetsService.delete(id);
  }
}


