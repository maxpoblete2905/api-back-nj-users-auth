// src/application/dto/update-location.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
  IsString,
  IsISO8601,
} from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({
    example: -33.45694,
    description: 'Latitud geográfica',
    required: true,
    type: Number,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    example: -70.64827,
    description: 'Longitud geográfica',
    required: true,
    type: Number,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    example: 15.5,
    description: 'Altitud sobre el nivel del mar en metros',
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  altitude?: number;

  @ApiProperty({
    example: 12.34,
    description: 'Precisión de la ubicación en metros',
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  accuracy?: number;

  @ApiProperty({
    example: '2023-05-20T12:34:56Z',
    description: 'Timestamp de la ubicación en ISO8601',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @IsISO8601()
  timestamp?: string;
}
