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
import { OrdersService } from './orders.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateOrderDto {
  buyerId!: number;
  totalAmount?: number;
  paymentMethod?: string;
  status!: string;
}

class UpdateOrderDto extends CreateOrderDto {}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.ordersService.findAll();
    return withContentRange(res, 'orders', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOrderDto) {
    return this.ordersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}


