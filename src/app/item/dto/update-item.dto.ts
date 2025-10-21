import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORY_ENUM } from 'src/shared/utils/enums';

export class UpdateItemDto {
  @ApiPropertyOptional({
    description: 'Brand of the item',
    example: 'Adidas',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Category of the item',
    enum: CATEGORY_ENUM,
  })
  @IsOptional()
  @IsEnum(CATEGORY_ENUM)
  category?: string;

  @ApiPropertyOptional({
    description: 'Color of the item',
    example: 'Red',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({
    description: 'URL of the item image',
    example: 'https://example.com/image-updated.jpg',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Name of the item',
    example: 'Ultra Boost',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Price of the item',
    example: 149.99,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  purchasePrice?: number;

  @ApiPropertyOptional({
    description: 'Size of the item',
    example: 'L',
  })
  @IsOptional()
  @IsString()
  size?: string;
}