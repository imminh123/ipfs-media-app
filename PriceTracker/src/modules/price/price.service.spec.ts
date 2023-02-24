import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import { DiscordModule } from '../discord/discord.module';
import { DiscordService } from '../discord/discord.service';
import { ADA_ID, Interval, OneDayToTimestamp } from './price.enum';
import { PriceService } from './price.service';
import { createMock } from '@golevelup/ts-jest';

describe('PriceService', () => {
  let priceService: PriceService;
  let discordService: DiscordService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        PriceService,
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn().mockReturnValue('value'),
          }),
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: () => jest.fn(),
            },
          },
        },
        {
          provide: DiscordService,
          useValue: {},
        },
      ],
    }).compile();

    priceService = module.get<PriceService>(PriceService);
    discordService = module.get<DiscordService>(DiscordService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(priceService).toBeDefined();
  });

  describe('#getCurrentPrice', () => {
    it('should make a API call to crypto pricing API with correct params', async () => {
      expect(httpService.axiosRef.get).not.toHaveBeenCalled();

      await priceService.getCurrentPrice();
      expect(httpService.axiosRef.get).toHaveBeenCalled();
    });
  });

  describe('#getHistoricalPrice', () => {
    it('should make an API call to crypto pricing API with correct is params for hour interval', async () => {
      const mockAxiosRef = { get: jest.fn() };

      expect(mockAxiosRef.get).not.toHaveBeenCalled();

      await priceService.getHistoricalPrice(Interval.HOUR, 5);
      const to = Math.floor(new Date().getTime() / 1000);
      const from = to - OneDayToTimestamp * 2;
      expect(mockAxiosRef.get).toHaveBeenCalledWith(
        `${process.env.SERVER_HOST_CRYPTO}/coins/${ADA_ID}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
      );
    });
  });

  describe('#emaCalculation', () => {
    it('should calculate the correct EMA value for given interval and num inputs', async () => {
      // Use the data from `getHistoricalPrice` to calculate expected EMA
      const expectedEMA = 20;

      const ema20 = await priceService.emaCalculation(Interval.HOUR, 20);
      expect(ema20).toEqual(expectedEMA);
    });
  });
});
