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
import { AdminLogsService } from './admin-logs.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateAdminLogDto {
  adminId!: number;
  action!: string;
  targetType!: string;
  targetId?: number;
}

class UpdateAdminLogDto extends CreateAdminLogDto {}

@Controller('admin-logs')
export class AdminLogsController {
  constructor(private readonly adminLogsService: AdminLogsService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.adminLogsService.findAll();
    return withContentRange(res, 'admin-logs', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminLogsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateAdminLogDto) {
    return this.adminLogsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAdminLogDto,
  ) {
    return this.adminLogsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminLogsService.delete(id);
  }
}


