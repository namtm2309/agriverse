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
import { AreasService } from './areas.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateAreaDto {
  name!: string;
}

class UpdateAreaDto {
  name?: string;
}

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.areasService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, ['name', 'level'] as any);
    setContentRange(res, 'areas', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateAreaDto) {
    return this.areasService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAreaDto,
  ) {
    return this.areasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.delete(id);
  }
}


