import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.area.findMany();
  }

  findOne(id: number) {
    return this.prisma.area.findUnique({ where: { id } });
  }

  create(data: { name: string }) {
    return this.prisma.area.create({ data });
  }

  update(id: number, data: { name?: string }) {
    return this.prisma.area.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    // Xoá/cắt các quan hệ phụ thuộc trước để tránh lỗi khoá ngoại,
    // giúp người dùng xoá Area trực tiếp trên giao diện.
    return this.prisma.$transaction(async (tx) => {
      // 1. Xoá toàn bộ farm thuộc area này
      await tx.farm.deleteMany({ where: { areaId: id } });

      // 2. Bỏ liên kết parent cho các area con (nếu có)
      await tx.area.updateMany({
        where: { parentId: id },
        data: { parentId: null },
      });

      // 3. Xoá chính area
      return tx.area.delete({ where: { id } });
    });
  }
}


