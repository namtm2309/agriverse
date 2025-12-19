import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) {}

  // Generate 2FA secret
  async generate2FASecret(userId: number) {
    const secret = speakeasy.generateSecret({
      name: `AgriVerse (${userId})`,
      issuer: 'AgriVerse',
    });

    // Lưu secret tạm thời (trong production nên lưu vào database)
    // For now, we'll store it in a way that can be retrieved
    // In production, store encrypted in database
    const tempSecret = secret.base32;

    return {
      secret: tempSecret,
      qrCodeUrl: await qrcode.toDataURL(secret.otpauth_url || ''),
      manualEntryKey: tempSecret,
    };
  }

  // Verify 2FA token
  verify2FAToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2, // Allow 2 time steps (60 seconds) tolerance
    });
  }

  // Password strength checker
  checkPasswordStrength(password: string): {
    score: number; // 0-4
    feedback: string[];
    isStrong: boolean;
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score++;
    } else {
      feedback.push('Mật khẩu nên có ít nhất 8 ký tự (Password should be at least 8 characters)');
    }

    if (/[a-z]/.test(password)) {
      score++;
    } else {
      feedback.push('Thêm chữ thường (Add lowercase letters)');
    }

    if (/[A-Z]/.test(password)) {
      score++;
    } else {
      feedback.push('Thêm chữ hoa (Add uppercase letters)');
    }

    if (/[0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Thêm số (Add numbers)');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score++;
    } else {
      feedback.push('Thêm ký tự đặc biệt (Add special characters)');
    }

    return {
      score,
      feedback: feedback.length > 0 ? feedback : ['Mật khẩu mạnh (Strong password)'],
      isStrong: score >= 4,
    };
  }

  // Rate limiting helper (simple in-memory, should use Redis in production)
  private rateLimitStore = new Map<string, { count: number; resetAt: Date }>();

  checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
    const now = new Date();
    const record = this.rateLimitStore.get(key);

    if (!record || now > record.resetAt) {
      // Reset or create new record
      const resetAt = new Date(now.getTime() + windowMs);
      this.rateLimitStore.set(key, { count: 1, resetAt });
      return true;
    }

    if (record.count >= maxRequests) {
      return false; // Rate limit exceeded
    }

    record.count++;
    return true;
  }

  // Cleanup old rate limit records
  cleanupRateLimit() {
    const now = new Date();
    for (const [key, record] of this.rateLimitStore.entries()) {
      if (now > record.resetAt) {
        this.rateLimitStore.delete(key);
      }
    }
  }
}

