import {
  Body,
  BadRequestException,
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
import { AdminLogsService } from './admin-logs.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

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
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.adminLogsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [
      'action',
      'targetType',
    ] as any);
    setContentRange(res, 'admin-logs', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminLogsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const { id: _id, createdAt: _createdAt, ...data } = body ?? {};
    if (data.targetId === '' || data.targetId === null || data.targetId === undefined) {
      delete data.targetId;
    }
    if (data.targetId !== undefined) {
      const n = Number(data.targetId);
      if (!Number.isFinite(n)) {
        throw new BadRequestException('targetId phải là số (Must be a number)');
      }
      data.targetId = n;
    }
    return this.adminLogsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const { id: _id, createdAt: _createdAt, ...data } = body ?? {};
    if (data.targetId === '' || data.targetId === null || data.targetId === undefined) {
      delete data.targetId;
    }
    if (data.targetId !== undefined) {
      const n = Number(data.targetId);
      if (!Number.isFinite(n)) {
        throw new BadRequestException('targetId phải là số (Must be a number)');
      }
      data.targetId = n;
    }
    return this.adminLogsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminLogsService.delete(id);
  }
}


