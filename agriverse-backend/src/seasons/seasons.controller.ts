import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SeasonsService } from './seasons.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.seasonsService.findAll();
    return withContentRange(res, 'seasons', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seasonsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateSeasonDto) {
    return this.seasonsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateSeasonDto) {
    return this.seasonsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seasonsService.delete(id);
  }
}


