import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DiscordModule } from '../discord/discord.module';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

@Module({
  imports: [HttpModule, DiscordModule],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
