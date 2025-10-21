import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { DTO_CreateItem, DTO_FindOneItem } from '../../database/dtos/item';
import { ItemRepository } from '../../database/repositories/item';
import APIError, {
  badRequest,
  ERROR_CODES,
  notFound,
} from '../../shared/utils/api-error';
import { MetaSchema } from '../../shared/utils/validator';
import { DB_Category } from '../../types/db';
import { T_Session } from '../../types/global';
import {
  CreateItemBodySchema,
  GetItemParamsSchema,
  ItemSchema,
  ListItemsQuerySchema,
  UpdateItemBodySchema,
} from './item.schema';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  listItems(query: z.infer<typeof ListItemsQuerySchema>): {
    data: z.infer<typeof ItemSchema>[];
    meta: z.infer<typeof MetaSchema>;
  } {
    const { count, page } = query;
    const filter = {};

    const { rows, meta } = this.itemRepository.paginateItems(filter, {
      count,
      page,
    });

    return {
      data: rows.map((row) => ItemSchema.parse(row)),
      meta,
    };
  }

  getItem(params: z.infer<typeof GetItemParamsSchema>): {
    data: z.infer<typeof ItemSchema>;
  } {
    const filter: DTO_FindOneItem = {
      id: params.id,
    };

    const item = this.itemRepository.findOneItem(filter);
    if (!item) {
      throw new APIError(
        notFound('Item not found', ERROR_CODES.RESOURCE_NOT_FOUND),
      );
    }

    return {
      data: ItemSchema.parse(item),
    };
  }

  createItem(
    body: z.infer<typeof CreateItemBodySchema>,
    session: T_Session,
  ): {
    data: z.infer<typeof ItemSchema>;
  } {
    const { name } = body;

    const item = this.itemRepository.findOneItem({ name });
    if (item) {
      throw new APIError(
        badRequest('Duplicate item found', ERROR_CODES.DUPLICATE_CONTENT),
      );
    }

    const createItemPayload: DTO_CreateItem = {
      brand: body.brand,
      category: body.category as DB_Category,
      color: body.color,
      imageUrl: body.imageUrl,
      name: body.name,
      purchaseDate: body.purchaseDate,
      purchasePrice: body.purchasePrice,
      size: body.size,
      userId: session.userId,
    };
    const document = this.itemRepository.createItem(createItemPayload);

    return {
      data: ItemSchema.parse(document),
    };
  }

  updateItem(
    body: z.infer<typeof UpdateItemBodySchema>,
    params: z.infer<typeof GetItemParamsSchema>,
  ): { data: z.infer<typeof ItemSchema> } {
    const filter: DTO_FindOneItem = {
      id: params.id,
    };

    const item = this.itemRepository.findOneItem(filter);
    if (!item) {
      throw new APIError(
        notFound('Item not found', ERROR_CODES.RESOURCE_NOT_FOUND),
      );
    }

    const document = this.itemRepository.updateItem(filter, { ...body });

    return {
      data: ItemSchema.parse(document),
    };
  }

  deleteItem(params: z.infer<typeof GetItemParamsSchema>): {
    data: z.infer<typeof ItemSchema>;
  } {
    const filter: DTO_FindOneItem = {
      id: params.id,
    };

    const item = this.itemRepository.findOneItem(filter);
    if (!item) {
      throw new APIError(
        notFound('Item not found', ERROR_CODES.RESOURCE_NOT_FOUND),
      );
    }

    this.itemRepository.deleteItem(filter);

    return {
      data: ItemSchema.parse(item),
    };
  }
}
