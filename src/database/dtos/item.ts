import { DB_Category } from 'src/types/db';

export type DTO_CreateItem = {
  brand: string;
  category: DB_Category;
  color: string;
  userId: string;
  name: string;
  size: string;
  imageUrl?: string;
  purchaseDate: Date;
  purchasePrice: number;
};

export type DTO_UpdateItem = {
  category?: DB_Category;
  color?: string;
  brand?: string;
  name?: string;
  size?: string;
  imageUrl?: string;
  purchasePrice?: number;
};

export type DTO_FindOneItem = {
  id?: string;
  category?: DB_Category;
  color?: string;
  brand?: string;
  name?: string;
};

export type DTO_ListItems = {
  category?: DB_Category;
  color?: string;
  userId?: string;
  brand?: string;
  name?: string;
};
