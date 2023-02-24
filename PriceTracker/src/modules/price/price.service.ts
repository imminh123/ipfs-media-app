import { HttpService } from '@nestjs/axios/dist';
import { Injectable, Logger } from '@nestjs/common';
import { ADA_ID, Interval, OneDayToTimestamp } from './price.enum';
import { Cron } from '@nestjs/schedule';
import { DiscordService } from '../discord/discord.service';
import { IADAPrice } from './price.interface';

@Injectable()
export class PriceService {
  private readonly logger = new Logger(PriceService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly discordService: DiscordService,
  ) {}

  async getCurrentPrice(): Promise<IADAPrice> {
    let response = null;
    try {
      response = await this.httpService.axiosRef.get(
        `${process.env.SERVER_HOST_CRYPTO}/simple/price?ids=${ADA_ID}&vs_currencies=usd`,
      );
    } catch (ex) {
      // error
      console.log(ex);
    }
    if (response) {
      // success
      const json = response.data;
      return json;
    }
  }

  async getHistoricalPrice(interval: Interval, num: number) {
    let response = null;
    const to = Math.floor(new Date().getTime() / 1000);
    let from;
    switch (interval) {
      case Interval.HOUR: {
        from = to / 1000 - OneDayToTimestamp * 2;
        break;
      }
      case Interval.HOURS: {
        from = to - OneDayToTimestamp * 4;
        break;
      }
      default: {
        from = to - OneDayToTimestamp * 91;
      }
    }
    try {
      response = await this.httpService.axiosRef.get(
        `${process.env.SERVER_HOST_CRYPTO}/coins/${ADA_ID}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
      );
    } catch (ex) {
      // error
      console.log(ex);
    }
    if (response) {
      // success
      const json = response.data.prices;
      switch (interval) {
        case Interval.HOUR: {
          return json.slice(json.length - num).reverse();
        }
        case Interval.HOURS: {
          const res = [];
          let k = 0;
          json
            .slice(json.length - 4 * num)
            .reverse()
            .forEach((value) => {
              if (k === 0) {
                res.push(value);
              }
              k = (k + 1) % 4;
            });
          return res;
        }
        default: {
          return json.slice(json.length - num).reverse();
        }
      }
    }
  }

  async emaCalculation(interval, num) {
    const k = 2 / (num + 1);
    const prices = await this.getHistoricalPrice(interval, num);
    const n = prices.length;
    let ema = prices[n - 1][1];
    for (let i = n - 2; i >= 0; i--) {
      ema = prices[i][1] * k + ema * (1 - k);
    }
    return ema;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    const ema20 = await this.emaCalculation(Interval.HOUR, 20);
    const {
      cardano: { usd },
    } = await this.getCurrentPrice();

    if (usd < ema20) {
      const message = `ADA price has just dropped to ${usd}, below its EMA-20 of ${ema20}.`;
      this.logger.log(message);
      await this.discordService.sendNotification(message);
    }
  }
}
