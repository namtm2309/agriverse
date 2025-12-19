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
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { FarmLogsService } from './farm-logs.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateFarmLogDto {
  @IsNumber()
  seasonId!: number;

  @IsOptional()
  @IsNumber()
  taskId?: number;

  @IsString()
  note!: string;

  @IsOptional()
  @IsString()
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
    // Đảm bảo note luôn có giá trị (Ensure note always has a value)
    const data = {
      ...body,
      note: body.note || '',
    };
    return this.farmLogsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFarmLogDto,
  ) {
    // Đảm bảo note luôn có giá trị nếu được cung cấp (Ensure note has value if provided)
    const data = body.note !== undefined ? { ...body, note: body.note || '' } : body;
    return this.farmLogsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmLogsService.delete(id);
  }
}


