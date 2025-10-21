import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_ENUM } from 'src/shared/utils/enums';

export class ItemResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the item',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Brand of the item',
    example: 'Nike',
  })
  brand: string;

  @ApiProperty({
    description: 'Category of the item',
    enum: CATEGORY_ENUM,
  })
  category: string;

  @ApiProperty({
    description: 'Color of the item',
    example: 'Blue',
  })
  color: string;

  @ApiProperty({
    description: 'URL of the item image',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Name of the item',
    example: 'Air Max 90',
  })
  name: string;

  @ApiProperty({
    description: 'Date when the item was purchased',
    example: '2024-01-15T00:00:00.000Z',
    type: Date,
  })
  purchaseDate: Date;

  @ApiProperty({
    description: 'Price of the item',
    example: 129.99,
  })
  purchasePrice: number;

  @ApiProperty({
    description: 'Size of the item',
    example: 'M',
  })
  size: string;

  @ApiProperty({
    description: 'User ID who owns this item',
    example: 'e36a823b-9f05-4c44-8eec-454c36737ee2',
  })
  userId: string;
}

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  perPage: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 50,
  })
  totalRows: number;
}

export class ItemsListResponseDto {
  @ApiProperty({
    type: [ItemResponseDto],
    description: 'Array of items',
  })
  data: ItemResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Pagination metadata',
  })
  meta: PaginationMetaDto;
}

export class SingleItemResponseDto {
  @ApiProperty({
    type: ItemResponseDto,
    description: 'Item data',
  })
  data: ItemResponseDto;
}