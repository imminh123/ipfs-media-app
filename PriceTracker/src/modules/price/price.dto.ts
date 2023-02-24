import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Interval, NumberOfEma } from './price.enum';

export class EmaDto {
  @IsOptional()
  @ApiProperty({
    type: String,
    enum: Interval,
    required: true,
  })
  interval: Interval;

  @IsOptional()
  @ApiProperty({
    type: Number,
    enum: NumberOfEma,
    required: true,
  })
  numberOfEma: NumberOfEma;
}
