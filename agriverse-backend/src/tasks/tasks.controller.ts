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
import { TasksService } from './tasks.service';
import { withContentRange } from '../common/list-with-range.util';

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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.tasksService.findAll();
    return withContentRange(res, 'tasks', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}


