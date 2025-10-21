# API Documentation Setup

## Overview
This NestJS application includes comprehensive API documentation using Swagger/OpenAPI specification with two UI options:
1. **Swagger UI** - Classic interactive API documentation
2. **Scalar UI** - Modern, developer-friendly API documentation

## Access Points

Once the application is running, you can access:
- **Swagger UI**: http://localhost:3000/api
- **Scalar UI**: http://localhost:3000/scalar
- **OpenAPI JSON**: http://localhost:3000/api-json

## Features Implemented

### 1. Zod Schema Integration
The application uses Zod schemas for validation and automatically generates Swagger documentation from them.

### 2. Swagger Decorators
All endpoints in the Item Controller include:
- Operation summaries
- Response types and status codes
- Parameter descriptions
- Request body schemas

### 3. DTO Classes
Created dedicated DTO classes with validation decorators:
- `CreateItemDto` - For creating new items
- `UpdateItemDto` - For updating existing items
- `ListItemsQueryDto` - For pagination and filtering
- `ItemResponseDto` - For response structure

### 4. Scalar UI Integration
Provides a modern alternative to Swagger UI with:
- Dark mode support
- Better search functionality
- Cleaner interface
- Request/response examples

## API Endpoints

### Items Resource

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items | List all items with pagination |
| GET | /items/:id | Get a single item by ID |
| POST | /items | Create a new item |
| PATCH | /items/:id | Update an existing item |
| DELETE | /items/:id | Delete an item |

### Query Parameters for GET /items
- `page` - Page number (default: 1)
- `count` - Items per page (default: 10, max: 100)
- `category` - Filter by category
- `color` - Filter by color
- `brand` - Filter by brand
- `name` - Filter by name
- `userId` - Filter by user ID

## Categories
Available item categories:
- accessories
- bottoms
- dresses
- outerwear
- shoes
- tops

## Development

### Running the Application
```bash
# Development mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

### Building the Application
```bash
pnpm run build
```

## Configuration

The Swagger configuration can be customized in:
- `/src/config/swagger.config.ts` - Main Swagger and Scalar configuration
- `/src/main.ts` - Application bootstrap with documentation setup

## Additional Utilities

### Zod to Swagger Converter
Located at `/src/shared/utils/zod-to-swagger.ts`, this utility helps convert Zod schemas to OpenAPI specifications for better integration between validation and documentation.