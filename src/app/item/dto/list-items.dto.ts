import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORY_ENUM } from 'src/shared/utils/enums';

export class ListItemsQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  count: number = 10;

  @ApiPropertyOptional({
    description: 'Filter by category',
    enum: CATEGORY_ENUM,
  })
  @IsOptional()
  @IsEnum(CATEGORY_ENUM)
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter by color',
    example: 'Blue',
  })
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: 'Filter by user ID',
    example: 'e36a823b-9f05-4c44-8eec-454c36737ee2',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Filter by brand',
    example: 'Nike',
  })
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Filter by name',
    example: 'Air Max',
  })
  @IsOptional()
  name?: string;
}