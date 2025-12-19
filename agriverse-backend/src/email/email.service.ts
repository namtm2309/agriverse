import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Khởi tạo transporter từ environment variables
    // Trong production, nên dùng SMTP service như SendGrid, Mailgun, hoặc Gmail SMTP
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    // Chỉ tạo transporter nếu có config
    if (smtpConfig.auth.user && smtpConfig.auth.pass) {
      this.transporter = nodemailer.createTransport(smtpConfig);
    } else {
      this.logger.warn(
        'SMTP not configured. Email service will log emails instead of sending them.',
      );
    }
  }

  // Gửi email
  async sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ): Promise<boolean> {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@agriverse.com',
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      html,
    };

    if (!this.transporter) {
      // Log email instead of sending (development mode)
      this.logger.log('=== EMAIL (NOT SENT - SMTP not configured) ===');
      this.logger.log(`To: ${to}`);
      this.logger.log(`Subject: ${subject}`);
      this.logger.log(`Body: ${text || html}`);
      return true; // Return true để không break flow
    }

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      return false;
    }
  }

  // Gửi email reset password
  async sendPasswordResetEmail(
    to: string,
    username: string,
    resetToken: string,
  ): Promise<boolean> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AgriVerse - Đặt lại mật khẩu</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${username}</strong>,</p>
              <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản AgriVerse của bạn.</p>
              <p>Vui lòng click vào nút bên dưới để đặt lại mật khẩu:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Đặt lại mật khẩu</a>
              </p>
              <p>Hoặc copy link sau vào trình duyệt:</p>
              <p style="word-break: break-all; color: #666;">${resetUrl}</p>
              <p><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 1 giờ.</p>
              <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} AgriVerse. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail(
      to,
      'AgriVerse - Đặt lại mật khẩu (Reset Password)',
      html,
    );
  }

  // Gửi email thông báo
  async sendNotificationEmail(
    to: string,
    title: string,
    message: string,
    link?: string,
  ): Promise<boolean> {
    const linkHtml = link
      ? `<p><a href="${link}" class="button">Xem chi tiết</a></p>`
      : '';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AgriVerse - Thông báo</h1>
            </div>
            <div class="content">
              <h2>${title}</h2>
              <p>${message}</p>
              ${linkHtml}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} AgriVerse. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail(to, `AgriVerse - ${title}`, html);
  }

  // Gửi báo cáo định kỳ
  async sendReportEmail(
    to: string,
    reportType: string,
    reportData: any,
    attachment?: { filename: string; content: Buffer; contentType: string },
  ): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #4CAF50; color: white; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AgriVerse - Báo cáo ${reportType}</h1>
            </div>
            <div class="content">
              <p>Báo cáo ${reportType} cho ngày ${new Date().toLocaleDateString('vi-VN')}</p>
              <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">${JSON.stringify(reportData, null, 2)}</pre>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} AgriVerse. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions: any = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@agriverse.com',
      to,
      subject: `AgriVerse - Báo cáo ${reportType}`,
      html,
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        },
      ];
    }

    if (!this.transporter) {
      this.logger.log('=== REPORT EMAIL (NOT SENT) ===');
      this.logger.log(`To: ${to}`);
      this.logger.log(`Report Type: ${reportType}`);
      this.logger.log(`Data: ${JSON.stringify(reportData, null, 2)}`);
      return true;
    }

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Report email sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send report email to ${to}:`, error);
      return false;
    }
  }
}

