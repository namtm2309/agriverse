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
import { FarmLogsService } from './farm-logs.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.farmLogsService.findAll();
    return withContentRange(res, 'farm-logs', items);
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


