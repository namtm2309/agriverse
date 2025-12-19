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
import { OrderItemsService } from './order-items.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../common/dto/order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.orderItemsService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, [] as any);
    setContentRange(res, 'order-items', start, end, total);
    return data;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const { id: _id, ...data } = body ?? {};
    return this.orderItemsService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const { id: _id, ...data } = body ?? {};
    return this.orderItemsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.delete(id);
  }
}

