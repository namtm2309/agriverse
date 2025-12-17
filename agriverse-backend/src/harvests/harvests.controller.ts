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
import { HarvestsService } from './harvests.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.harvestsService.findAll();
    return withContentRange(res, 'harvests', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.harvestsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateHarvestDto) {
    return this.harvestsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHarvestDto,
  ) {
    return this.harvestsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.harvestsService.delete(id);
  }
}


