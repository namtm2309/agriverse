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
import { PlotsService } from './plots.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreatePlotDto {
  farmId!: number;
  code!: string;
  areaSize?: number;
  soilType?: string;
  waterSource?: string;
  gpsPolygon?: string;
  status?: string;
}

class UpdatePlotDto {
  farmId?: number;
  code?: string;
  areaSize?: number;
  soilType?: string;
  waterSource?: string;
  gpsPolygon?: string;
  status?: string;
}

@Controller('plots')
export class PlotsController {
  constructor(private readonly plotsService: PlotsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.plotsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [
      'code',
      'soilType',
      'waterSource',
      'gpsPolygon',
      'status',
    ] as any);
    setContentRange(res, 'plots', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plotsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreatePlotDto) {
    return this.plotsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePlotDto) {
    return this.plotsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plotsService.delete(id);
  }
}


