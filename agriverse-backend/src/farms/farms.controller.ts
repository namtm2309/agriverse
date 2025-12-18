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
import { FarmsService } from './farms.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateFarmDto {
  name!: string;
  areaId!: number;
  ownerId?: number;
}

class UpdateFarmDto {
  name?: string;
  areaId?: number;
  ownerId?: number | null;
}

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.farmsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [
      'name',
      'address',
      'certification',
      'status',
    ] as any);
    setContentRange(res, 'farms', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateFarmDto) {
    return this.farmsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFarmDto,
  ) {
    return this.farmsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.delete(id);
  }
}


