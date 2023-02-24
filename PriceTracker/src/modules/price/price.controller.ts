import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmaDto } from './price.dto';
import { PriceService } from './price.service';

@Controller('price')
@ApiTags('price')
@ApiBearerAuth('access-token')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}
  @Get('')
  @ApiOperation({
    operationId: 'get-ada-price',
    description: 'Get ada price',
    summary: 'get ada price',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  getPrice() {
    return this.priceService.getCurrentPrice();
  }

  @Get('ema')
  @ApiOperation({
    operationId: 'get-ema-ada-price',
    description: 'Get ema ada price',
    summary: 'get ema ada price',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
  })
  getEma(@Query() { interval, numberOfEma }: EmaDto) {
    return this.priceService.emaCalculation(interval, numberOfEma);
  }
}
