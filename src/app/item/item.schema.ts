import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CATEGORY_ENUM } from 'src/shared/utils/enums';
import { PaginationMetaDto } from 'src/shared/utils/validator';
import { z } from 'zod';

export const CreateItemBodySchema = z.object({
  brand: z.string({ message: 'Brand is required' }),
  category: z.enum(CATEGORY_ENUM as [string, ...string[]], {
    message: 'Category must be valid',
  }),
  color: z.string({ message: 'Color is required' }),
  imageUrl: z.string().optional(),
  name: z.string({ message: 'Item name is required' }),
  purchaseDate: z.coerce.date({ message: 'Purchase date must be valid' }),
  purchasePrice: z.coerce.number({ message: 'Purchase price is required' }),
  size: z.string({ message: 'Size is required' }),
});

export const UpdateItemBodySchema = z.object({
  brand: z.string().optional(),
  category: z.enum(CATEGORY_ENUM, 'Category must be valid').optional(),
  color: z.string().optional(),
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  purchasePrice: z.coerce.number().optional(),
  size: z.string().optional(),
});

export const GetItemParamsSchema = z.object({
  id: z.uuid({ message: 'Item ID is required' }),
});

export const ListItemsQuerySchema = z.object({
  count: z.coerce.number({ message: 'Count is required' }),
  page: z.coerce.number({ message: 'Page is required' }),
});

export const ItemSchema = z.object({
  brand: z.string(),
  category: z.enum(CATEGORY_ENUM as [string, ...string[]], {
    message: 'Category must be valid',
  }),
  color: z.string(),
  id: z.uuid(),
  imageUrl: z.string().optional(),
  name: z.string(),
  purchaseDate: z.coerce.date(),
  purchasePrice: z.coerce.number(),
  size: z.string(),
  userId: z.uuid(),
});

class ItemResponseDto {
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

export class ItemsListResponseDto {
  @ApiProperty({
    description: 'Array of items',
    type: [ItemResponseDto],
  })
  data: ItemResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}

export class SingleItemResponseDto {
  @ApiProperty({
    description: 'Item data',
    type: ItemResponseDto,
  })
  data: ItemResponseDto;
}

export class CreateItemBodyDto {
  @ApiProperty({
    description: 'Brand of the item',
    example: 'Nike',
  })
  brand: string;

  @ApiProperty({
    description: 'Category of the item',
    enum: CATEGORY_ENUM,
    example: CATEGORY_ENUM[0],
  })
  category: string;

  @ApiProperty({
    description: 'Color of the item',
    example: 'Blue',
  })
  color: string;

  @ApiPropertyOptional({
    description: 'URL of the item image',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Name of the item',
    example: 'Air Max 90',
  })
  name: string;

  @ApiProperty({
    description: 'Date when the item was purchased',
    example: '2024-01-15',
    type: Date,
  })
  purchaseDate: Date;

  @ApiProperty({
    description: 'Price of the item',
    example: 129.99,
    type: Number,
  })
  purchasePrice: number;

  @ApiProperty({
    description: 'Size of the item',
    example: 'M',
  })
  size: string;
}

export class UpdateItemBodyDto {
  @ApiPropertyOptional({
    description: 'Brand of the item',
    example: 'Nike',
  })
  brand?: string;

  @ApiPropertyOptional({
    description: 'Category of the item',
    enum: CATEGORY_ENUM,
    example: CATEGORY_ENUM[0],
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'Color of the item',
    example: 'Blue',
  })
  color?: string;

  @ApiPropertyOptional({
    description: 'URL of the item image',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Name of the item',
    example: 'Air Max 90',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Price of the item',
    example: 129.99,
    type: Number,
  })
  purchasePrice?: number;

  @ApiPropertyOptional({
    description: 'Size of the item',
    example: 'M',
  })
  size?: string;
}
