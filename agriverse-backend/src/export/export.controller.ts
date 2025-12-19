import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get(':resource')
  async export(
    @Param('resource') resource: string,
    @Query('format') format: string = 'csv',
    @Res() res: Response,
  ) {
    const data = await this.exportService.exportData(resource, format);
    
    const filename = `${resource}-${new Date().toISOString().split('T')[0]}.${format}`;
    const contentType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    return res.send(data);
  }
}

