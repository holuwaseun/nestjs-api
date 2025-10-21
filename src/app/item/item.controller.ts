import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';

import { MetaSchema, ZodValidationPipe } from '../../shared/utils/validator';
import { ItemsListResponseDto, SingleItemResponseDto } from './dto';
import {
  CreateItemBodySchema,
  GetItemParamsSchema,
  ItemSchema,
  ListItemsQuerySchema,
  UpdateItemBodySchema,
} from './item.schema';
import { ItemService } from './item.service';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOperation({ summary: 'List all items with pagination' })
  @ApiResponse({
    description: 'List of items retrieved successfully',
    status: 200,
    type: ItemsListResponseDto,
  })
  @ApiResponse({ description: 'Bad Request', status: 400 })
  listItems(
    @Query(new ZodValidationPipe(ListItemsQuerySchema))
    query: z.infer<typeof ListItemsQuerySchema>,
  ): {
    data: z.infer<typeof ItemSchema>[];
    meta: z.infer<typeof MetaSchema>;
  } {
    const { data, meta } = this.itemService.listItems(query);
    return {
      data,
      meta,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a single item by ID' })
  @ApiParam({
    description: 'Item unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
    name: 'id',
  })
  @ApiResponse({
    description: 'Item retrieved successfully',
    status: 200,
    type: SingleItemResponseDto,
  })
  @ApiResponse({ description: 'Item not found', status: 404 })
  getItem(
    @Param(new ZodValidationPipe(GetItemParamsSchema))
    params: z.infer<typeof GetItemParamsSchema>,
  ): { data: z.infer<typeof ItemSchema> } {
    const { data } = this.itemService.getItem(params);
    return {
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    description: 'Item created successfully',
    status: 201,
    type: SingleItemResponseDto,
  })
  @ApiResponse({ description: 'Bad Request - Invalid input', status: 400 })
  @HttpCode(HttpStatus.CREATED)
  createItem(
    @Body(new ZodValidationPipe(CreateItemBodySchema))
    body: z.infer<typeof CreateItemBodySchema>,
  ): { data: z.infer<typeof ItemSchema> } {
    const { data } = this.itemService.createItem(body, {
      userId: 'e36a823b-9f05-4c44-8eec-454c36737ee2',
    });
    return {
      data,
    };
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing item' })
  @ApiParam({
    description: 'Item unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
    name: 'id',
  })
  @ApiResponse({
    description: 'Item updated successfully',
    status: 200,
    type: SingleItemResponseDto,
  })
  @ApiResponse({ description: 'Item not found', status: 404 })
  @ApiResponse({ description: 'Bad Request - Invalid input', status: 400 })
  updateItem(
    @Param(new ZodValidationPipe(GetItemParamsSchema))
    params: z.infer<typeof GetItemParamsSchema>,
    @Body(new ZodValidationPipe(UpdateItemBodySchema))
    body: z.infer<typeof UpdateItemBodySchema>,
  ): { data: z.infer<typeof ItemSchema> } {
    const { data } = this.itemService.updateItem(body, params);
    return {
      data,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({
    description: 'Item unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
    name: 'id',
  })
  @ApiResponse({
    description: 'Item deleted successfully',
    status: 204,
  })
  @ApiResponse({ description: 'Item not found', status: 404 })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteItem(
    @Param(new ZodValidationPipe(GetItemParamsSchema))
    params: z.infer<typeof GetItemParamsSchema>,
  ): void {
    this.itemService.deleteItem(params);
  }
}
