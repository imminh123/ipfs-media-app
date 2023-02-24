import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookClient } from 'discord.js';

@Injectable()
export class DiscordService {
  private webhookClient: WebhookClient;

  constructor(private readonly configService: ConfigService) {
    this.webhookClient = new WebhookClient(
      {
        id: this.configService.get('DISCORD_CLIENT_ID'),
        token: this.configService.get('DISCORD_WEBHOOK_TOKEN'),
      },
      {},
    );
  }

  sendNotification(message: string) {
    return this.webhookClient.send(message);
  }
}
