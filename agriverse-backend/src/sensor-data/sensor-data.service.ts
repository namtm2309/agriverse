import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SensorDataService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.sensorData.findMany({
      include: { device: true },
    });
  }

  findOne(id: number) {
    return this.prisma.sensorData.findUnique({
      where: { id },
      include: { device: true },
    });
  }

  create(data: {
    deviceId: number;
    temperature?: number;
    humidity?: number;
    soilMoisture?: number;
  }) {
    return this.prisma.sensorData.create({ data });
  }

  update(
    id: number,
    data: Partial<{
      deviceId: number;
      temperature: number;
      humidity: number;
      soilMoisture: number;
    }>,
  ) {
    return this.prisma.sensorData.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.sensorData.delete({ where: { id } });
  }
}


