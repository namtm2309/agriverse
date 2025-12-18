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
import { SensorDataService } from './sensor-data.service';
import { setContentRange } from '../common/list-with-range.util';
import { parseRaListQuery } from '../common/ra/ra-list-query.util';
import { applyRaListQuery } from '../common/ra/apply-ra-list.util';

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
  async findAll(@Query() query: any, @Res({ passthrough: true }) res: Response) {
    const items = (await this.sensorDataService.findAll()) as any[];
    const ra = parseRaListQuery(query);
    const { data, total, start, end } = applyRaListQuery(items, ra, ['id'] as any);
    setContentRange(res, 'sensor-data', start, end, total);
    return data;
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


