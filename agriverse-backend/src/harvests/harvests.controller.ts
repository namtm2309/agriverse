import {
  Body,
  BadRequestException,
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
import { HarvestsService } from './harvests.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateHarvestDto {
  seasonId!: number;
  harvestDate?: Date;
  actualYield?: number;
  qualityNote?: string;
}

class UpdateHarvestDto extends CreateHarvestDto {}

@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.harvestsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, ['qualityNote'] as any);
    setContentRange(res, 'harvests', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.harvestsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.harvestDate) {
      const d = new Date(data.harvestDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày thu hoạch không hợp lệ (Invalid harvestDate)');
      }
      data.harvestDate = d;
    }
    return this.harvestsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.harvestDate) {
      const d = new Date(data.harvestDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày thu hoạch không hợp lệ (Invalid harvestDate)');
      }
      data.harvestDate = d;
    }
    return this.harvestsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.harvestsService.delete(id);
  }
}


