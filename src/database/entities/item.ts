import { v4 as uuid } from 'uuid';

import { DB_Category } from '../../types/db';
import { DTO_CreateItem } from '../dtos/item';

export class Item {
  brand: string;
  category: DB_Category;
  color: string;
  id: string;
  imageUrl?: string;
  name: string;
  purchaseDate: Date;
  purchasePrice: number;
  size: string;
  userId: string;

  constructor(payload: DTO_CreateItem) {
    this.brand = payload.brand;
    this.category = payload.category;
    this.color = payload.color;
    this.id = uuid();
    this.imageUrl = payload.imageUrl;
    this.name = payload.name;
    this.purchaseDate = payload.purchaseDate;
    this.purchasePrice = payload.purchasePrice;
    this.size = payload.size;
    this.userId = payload.userId;
  }
}
