import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  // In-memory token store (Trong production nên dùng Redis hoặc database)
  private resetTokens = new Map<string, { userId: number; expiresAt: Date }>();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu (Invalid credentials)');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu (Invalid credentials)');
    }

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      // Không tiết lộ user có tồn tại hay không (Don't reveal if user exists)
      return {
        message: 'Nếu tài khoản tồn tại, email reset password đã được gửi (If account exists, reset email sent)',
      };
    }

    // Validate password policy
    this.validatePasswordPolicy(''); // Will be validated in resetPassword

    // Tạo reset token (Generate reset token)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token hết hạn sau 1 giờ (Expires in 1 hour)

    this.resetTokens.set(token, { userId: user.id, expiresAt });

    // Gửi email reset password (Send reset password email)
    if (user.email) {
      await this.emailService.sendPasswordResetEmail(user.email, user.username, token);
    }

    // Trong development, có thể trả về token để test
    // Trong production, không trả về token
    const isDevelopment = process.env.NODE_ENV !== 'production';
    return {
      message: user.email
        ? 'Email reset password đã được gửi (Reset password email sent)'
        : 'Token reset password đã được tạo (Reset password token created)',
      ...(isDevelopment && { token }), // Chỉ trả về token trong development
      expiresAt: expiresAt.toISOString(),
    };
  }

  // Validate password policy
  validatePasswordPolicy(password: string): void {
    if (password.length < 4) {
      throw new BadRequestException(
        'Mật khẩu phải có ít nhất 4 ký tự (Password must be at least 4 characters)',
      );
    }
    // Có thể thêm các rule khác: uppercase, lowercase, numbers, special chars
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenData = this.resetTokens.get(token);
    if (!tokenData) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn (Invalid or expired token)');
    }

    if (new Date() > tokenData.expiresAt) {
      this.resetTokens.delete(token);
      throw new BadRequestException('Token đã hết hạn (Token expired)');
    }

    // Validate password policy
    this.validatePasswordPolicy(newPassword);

    // Hash password mới (Hash new password)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật password (Update password)
    const user = await this.prisma.user.update({
      where: { id: tokenData.userId },
      data: { password: hashedPassword },
    });

    // Xóa token đã dùng (Delete used token)
    this.resetTokens.delete(token);

    // Gửi email xác nhận (Send confirmation email)
    if (user.email) {
      await this.emailService.sendNotificationEmail(
        user.email,
        'Mật khẩu đã được đặt lại (Password Reset Successful)',
        'Mật khẩu của bạn đã được đặt lại thành công. Nếu bạn không thực hiện hành động này, vui lòng liên hệ admin ngay lập tức.',
      );
    }

    return {
      message: 'Đặt lại mật khẩu thành công (Password reset successful)',
    };
  }
}




