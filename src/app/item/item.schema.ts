import { CATEGORY_ENUM } from 'src/shared/utils/enums';
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
