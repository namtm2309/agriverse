import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  async exportData(resource: string, format: string) {
    // Map resource names to Prisma models (Map tên resource sang Prisma models)
    const resourceMap: Record<string, string> = {
      users: 'user',
      areas: 'area',
      farms: 'farm',
      plots: 'plot',
      crops: 'crop',
      seasons: 'season',
      tasks: 'task',
      'farm-logs': 'farmLog',
      devices: 'device',
      'sensor-data': 'sensorData',
      harvests: 'harvest',
      'product-batches': 'productBatch',
      'nft-assets': 'nftAsset',
      orders: 'order',
      'order-items': 'orderItem',
      'admin-logs': 'adminLog',
    };

    const modelName = resourceMap[resource];
    if (!modelName) {
      throw new NotFoundException(`Resource "${resource}" not found (Không tìm thấy resource "${resource}")`);
    }

    // Get data from database (Lấy dữ liệu từ database)
    const data = await (this.prisma as any)[modelName].findMany();

    if (format === 'csv') {
      return this.toCSV(data);
    } else if (format === 'excel' || format === 'xlsx') {
      return await this.toExcel(data);
    } else {
      throw new NotFoundException(`Format "${format}" not supported (Định dạng "${format}" không được hỗ trợ)`);
    }
  }

  private toCSV(data: any[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return JSON.stringify(value);
          return String(value).replace(/"/g, '""'); // Escape quotes
        }).join(',')
      ),
    ];

    return csvRows.join('\n');
  }

  private async toExcel(data: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    if (data.length === 0) {
      return Buffer.from([]);
    }

    // Add headers (Thêm headers)
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Style header row (Style hàng header)
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    // Add data rows (Thêm hàng dữ liệu)
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return value;
      });
      worksheet.addRow(values);
    });

    // Auto-fit columns (Tự động điều chỉnh độ rộng cột)
    worksheet.columns.forEach(column => {
      if (!column) return;
      let maxLength = 0;
      column.eachCell?.({ includeEmpty: true }, cell => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      if (column) {
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}

