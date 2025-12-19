import { Body, Controller, Post, Param, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { BulkService } from './bulk.service';
import { IsArray, IsNumber } from 'class-validator';

class BulkDeleteDto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids!: number[];
}

class BulkUpdateDto {
  @IsArray()
  @IsNumber({}, { each: true })
  ids!: number[];

  data!: Record<string, any>;
}

@Controller('bulk')
export class BulkController {
  constructor(private readonly bulkService: BulkService) {}

  @Post(':resource/delete')
  async bulkDelete(
    @Param('resource') resource: string,
    @Body() body: BulkDeleteDto,
  ) {
    return this.bulkService.bulkDelete(resource, body.ids);
  }

  @Post(':resource/update')
  async bulkUpdate(
    @Param('resource') resource: string,
    @Body() body: BulkUpdateDto,
  ) {
    return this.bulkService.bulkUpdate(resource, body.ids, body.data);
  }
}

