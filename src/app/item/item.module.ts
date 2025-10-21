import { Module } from '@nestjs/common';

import { ItemRepository } from '../../database/repositories/item';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  imports: [],
  providers: [ItemRepository, ItemService],
})
export class ItemModule {}
