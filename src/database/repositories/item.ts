import { Injectable } from '@nestjs/common';
import APIError, { internalServerError } from 'src/shared/utils/api-error';
import { MetaSchema, PaginateSchema } from 'src/shared/utils/validator';
import { z } from 'zod';

const store: Item[] = [];

import {
  DTO_CreateItem,
  DTO_FindOneItem,
  DTO_ListItems,
  DTO_UpdateItem,
} from '../dtos/item';
import { Item } from '../entities/item';

@Injectable()
export class ItemRepository {
  constructor() {}

  createItem = (payload: DTO_CreateItem): Item => {
    try {
      const row: Item = new Item(payload);
      store.push(row);
      return row;
    } catch {
      throw new APIError(internalServerError());
    }
  };

  findOneItem = (filter: Partial<DTO_FindOneItem>): Item | null => {
    try {
      const item: Item | undefined = store.find((row) => {
        // Apply all filter properties
        for (const key in filter) {
          if (filter[key as keyof DTO_FindOneItem] !== undefined) {
            if (
              row[key as keyof Item] !== filter[key as keyof DTO_FindOneItem]
            ) {
              return false;
            }
          }
        }
        return true;
      });
      return item ?? null;
    } catch {
      throw new APIError(internalServerError());
    }
  };

  paginateItems = (
    filter: Partial<DTO_ListItems>,
    paginate: z.infer<typeof PaginateSchema>,
  ): { rows: Item[] | []; meta: z.infer<typeof MetaSchema> } => {
    try {
      const { count, page } = paginate;
      const skip = (page - 1) * count;

      // Filter entries based on filter criteria
      const entries = store.filter((row) => {
        for (const key in filter) {
          if (filter[key as keyof DTO_ListItems] !== undefined) {
            if (row[key as keyof Item] !== filter[key as keyof DTO_ListItems]) {
              return false;
            }
          }
        }
        return true;
      });
      const total = entries.length;

      // Get the correct page entries using slice (not splice)
      const rows = entries.slice(skip, skip + count);

      const totalPages = Math.ceil(total / count);

      return {
        meta: {
          page,
          perPage: count,
          totalPages,
          totalRows: total,
        },
        rows,
      };
    } catch {
      throw new APIError(internalServerError());
    }
  };

  updateItem = (
    filter: Partial<DTO_FindOneItem>,
    payload: Partial<DTO_UpdateItem>,
  ): Item => {
    try {
      const entityIdx: number = store.findIndex((row) => {
        // Apply all filter properties
        for (const key in filter) {
          if (filter[key as keyof DTO_FindOneItem] !== undefined) {
            if (
              row[key as keyof Item] !== filter[key as keyof DTO_FindOneItem]
            ) {
              return false;
            }
          }
        }
        return true;
      });
      if (entityIdx < 0) {
        throw new Error('Entity not found');
      }

      const entity = store[entityIdx];
      Object.assign(entity, payload);

      store[entityIdx] = entity;
      return entity;
    } catch {
      throw new APIError(internalServerError());
    }
  };

  deleteItem = (filter: Partial<DTO_FindOneItem>): Item => {
    try {
      const entityIdx: number = store.findIndex((row) => {
        // Apply all filter properties
        for (const key in filter) {
          if (filter[key as keyof DTO_FindOneItem] !== undefined) {
            if (
              row[key as keyof Item] !== filter[key as keyof DTO_FindOneItem]
            ) {
              return false;
            }
          }
        }
        return true;
      });
      if (entityIdx < 0) {
        throw new Error('Entity not found');
      }

      const entity = store[entityIdx];
      store.splice(entityIdx, 1);
      return entity;
    } catch {
      throw new APIError(internalServerError());
    }
  };
}
