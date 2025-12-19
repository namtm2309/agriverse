// Base DTO với validation decorators dùng chung (Common validation decorators)
// Note: Base DTOs - có thể mở rộng sau nếu cần

export class BaseCreateDto {
  id?: string;
}

export class BaseUpdateDto {
  id?: string;
}

