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
import { CropsService } from './crops.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateCropDto {
  name!: string;
  variety?: string;
  growthDays?: number;
  tempMin?: number;
  tempMax?: number;
  humidityMin?: number;
  humidityMax?: number;
}

class UpdateCropDto extends CreateCropDto {}

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.cropsService.findAll();
    return withContentRange(res, 'crops', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cropsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCropDto) {
    return this.cropsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCropDto) {
    return this.cropsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cropsService.delete(id);
  }
}


