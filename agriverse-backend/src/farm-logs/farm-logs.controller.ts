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
import { FarmLogsService } from './farm-logs.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateFarmLogDto {
  seasonId!: number;
  taskId?: number;
  note!: string;
  imageUrl?: string;
}

class UpdateFarmLogDto extends CreateFarmLogDto {}

@Controller('farm-logs')
export class FarmLogsController {
  constructor(private readonly farmLogsService: FarmLogsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.farmLogsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, ['note', 'imageUrl'] as any);
    setContentRange(res, 'farm-logs', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmLogsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateFarmLogDto) {
    return this.farmLogsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFarmLogDto,
  ) {
    return this.farmLogsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmLogsService.delete(id);
  }
}


