import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './modules/health/health.controller';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PriceModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
