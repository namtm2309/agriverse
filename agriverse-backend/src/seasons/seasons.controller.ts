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
import { SeasonsService } from './seasons.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateSeasonDto {
  plotId!: number;
  cropId!: number;
  startDate!: Date;
  expectedHarvestDate?: Date;
  expectedYield?: number;
  status?: string;
}

class UpdateSeasonDto extends CreateSeasonDto {}

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.seasonsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, ['status'] as any);
    setContentRange(res, 'seasons', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seasonsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.startDate) {
      const d = new Date(data.startDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày bắt đầu không hợp lệ (Invalid startDate)');
      }
      data.startDate = d;
    }
    if (data.expectedHarvestDate) {
      const d = new Date(data.expectedHarvestDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày dự kiến thu hoạch không hợp lệ (Invalid expectedHarvestDate)');
      }
      data.expectedHarvestDate = d;
    }
    return this.seasonsService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.startDate) {
      const d = new Date(data.startDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày bắt đầu không hợp lệ (Invalid startDate)');
      }
      data.startDate = d;
    }
    if (data.expectedHarvestDate) {
      const d = new Date(data.expectedHarvestDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Ngày dự kiến thu hoạch không hợp lệ (Invalid expectedHarvestDate)');
      }
      data.expectedHarvestDate = d;
    }
    return this.seasonsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seasonsService.delete(id);
  }
}


