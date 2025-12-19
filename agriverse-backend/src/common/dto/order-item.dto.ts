import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt({ message: 'ID đơn hàng phải là số nguyên (Order ID must be an integer)' })
  orderId!: number;

  @IsInt({ message: 'ID lô sản phẩm phải là số nguyên (Product batch ID must be an integer)' })
  productBatchId!: number;

  @IsInt({ message: 'Số lượng phải là số nguyên (Quantity must be an integer)' })
  @Min(1, { message: 'Số lượng phải lớn hơn 0 (Quantity must be greater than 0)' })
  quantity!: number;

  @IsNumber({}, { message: 'Giá phải là số (Price must be a number)' })
  @Min(0, { message: 'Giá không được âm (Price cannot be negative)' })
  price!: number;
}

export class UpdateOrderItemDto extends CreateOrderItemDto {}

