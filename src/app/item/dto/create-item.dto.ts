import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORY_ENUM } from 'src/shared/utils/enums';

export class CreateItemDto {
  @ApiProperty({
    description: 'Brand of the item',
    example: 'Nike',
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Category of the item',
    enum: CATEGORY_ENUM,
    example: CATEGORY_ENUM[0],
  })
  @IsEnum(CATEGORY_ENUM)
  category: string;

  @ApiProperty({
    description: 'Color of the item',
    example: 'Blue',
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'URL of the item image',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({
    description: 'Name of the item',
    example: 'Air Max 90',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Date when the item was purchased',
    example: '2024-01-15',
    type: Date,
  })
  @Type(() => Date)
  @IsDate()
  purchaseDate: Date;

  @ApiProperty({
    description: 'Price of the item',
    example: 129.99,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({
    description: 'Size of the item',
    example: 'M',
  })
  @IsString()
  size: string;
}