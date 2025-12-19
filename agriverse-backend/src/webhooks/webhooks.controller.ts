import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateWebhookDto {
  url!: string;
  events!: string[];
  secret?: string;
}

class UpdateWebhookDto {
  url?: string;
  events?: string[];
  active?: boolean;
}

@Controller('webhooks')
@UseGuards(JwtAuthGuard)
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  async getAllWebhooks() {
    return this.webhooksService.getAllWebhooks();
  }

  @Get(':id')
  async getWebhookById(@Param('id') id: string) {
    return this.webhooksService.getWebhookById(parseInt(id, 10));
  }

  @Post()
  async createWebhook(@Body() body: CreateWebhookDto) {
    return this.webhooksService.createWebhook(body.url, body.events, body.secret);
  }

  @Put(':id')
  async updateWebhook(@Param('id') id: string, @Body() body: UpdateWebhookDto) {
    return this.webhooksService.updateWebhook(
      parseInt(id, 10),
      body.url,
      body.events,
      body.active,
    );
  }

  @Delete(':id')
  async deleteWebhook(@Param('id') id: string) {
    return this.webhooksService.deleteWebhook(parseInt(id, 10));
  }

  // Test webhook endpoint (gửi test event)
  @Post('test/:id')
  async testWebhook(@Param('id') id: string) {
    const webhook = await this.webhooksService.getWebhookById(parseInt(id, 10));
    return this.webhooksService.sendWebhookEvent('test.event', {
      message: 'This is a test webhook',
      timestamp: new Date().toISOString(),
    });
  }
}

