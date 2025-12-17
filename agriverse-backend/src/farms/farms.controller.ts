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
import { FarmsService } from './farms.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.farmsService.findAll();
    return withContentRange(res, 'farms', items);
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


