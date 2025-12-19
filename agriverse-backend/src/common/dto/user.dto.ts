import { IsString, IsEmail, IsOptional, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự (Username must be at least 3 characters)' })
  username!: string;

  @IsString()
  @MinLength(4, { message: 'Mật khẩu phải có ít nhất 4 ký tự (Password must be at least 4 characters)' })
  password!: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ (Invalid email)' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ADMIN', 'FARMER', 'INVESTOR', 'CONSUMER'], {
    message: 'Vai trò không hợp lệ (Invalid role)',
  })
  role?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'BLOCKED'], {
    message: 'Trạng thái không hợp lệ (Invalid status)',
  })
  status?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ (Invalid email)' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ADMIN', 'FARMER', 'INVESTOR', 'CONSUMER'])
  role?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ACTIVE', 'BLOCKED'])
  status?: string;
}

