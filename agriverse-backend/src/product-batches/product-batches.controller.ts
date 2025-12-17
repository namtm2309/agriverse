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
import { ProductBatchesService } from './product-batches.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateProductBatchDto {
  harvestId!: number;
  name!: string;
  quantity!: number;
  unit!: string;
  price!: number;
  qrCode?: string;
  status?: string;
}

class UpdateProductBatchDto extends CreateProductBatchDto {}

@Controller('product-batches')
export class ProductBatchesController {
  constructor(private readonly productBatchesService: ProductBatchesService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.productBatchesService.findAll();
    return withContentRange(res, 'product-batches', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productBatchesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductBatchDto) {
    return this.productBatchesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductBatchDto,
  ) {
    return this.productBatchesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productBatchesService.delete(id);
  }
}


