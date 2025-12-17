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
import { SensorDataService } from './sensor-data.service';
import { withContentRange } from '../common/list-with-range.util';

class CreateSensorDataDto {
  deviceId!: number;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
}

class UpdateSensorDataDto extends CreateSensorDataDto {}

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    const items = await this.sensorDataService.findAll();
    return withContentRange(res, 'sensor-data', items);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sensorDataService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateSensorDataDto) {
    return this.sensorDataService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSensorDataDto,
  ) {
    return this.sensorDataService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sensorDataService.delete(id);
  }
}


