import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './modules/health/health.controller';
import { PriceModule } from './modules/price/price.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    PriceModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
