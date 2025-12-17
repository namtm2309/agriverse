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
import { DevicesService } from './devices.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateDeviceDto {
  plotId?: number;
  name!: string;
  deviceType?: string;
  status?: string;
}

class UpdateDeviceDto extends CreateDeviceDto {}

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.devicesService.findAll();
    return withContentRange(res, 'devices', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateDeviceDto) {
    return this.devicesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDeviceDto,
  ) {
    return this.devicesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.delete(id);
  }
}


