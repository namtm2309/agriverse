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
import { TasksService } from './tasks.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

class CreateTaskDto {
  seasonId!: number;
  title!: string;
  description?: string;
  dueDate?: Date;
  taskType?: string;
  status?: string;
}

class UpdateTaskDto extends CreateTaskDto {}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.tasksService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [
      'title',
      'description',
      'taskType',
      'status',
    ] as any);
    setContentRange(res, 'tasks', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.dueDate) {
      const d = new Date(data.dueDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Hạn công việc không hợp lệ (Invalid dueDate)');
      }
      data.dueDate = d;
    }
    return this.tasksService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = body ?? {};
    if (data.dueDate) {
      const d = new Date(data.dueDate);
      if (Number.isNaN(d.getTime())) {
        throw new BadRequestException('Hạn công việc không hợp lệ (Invalid dueDate)');
      }
      data.dueDate = d;
    }
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}


