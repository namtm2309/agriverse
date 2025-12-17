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
import { AreasService } from './areas.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.areasService.findAll();
    return withContentRange(res, 'areas', items);
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


