### NestJS Items API

A RESTful API built with NestJS for managing items with CRUD operations.

## Features

- **CRUD Operations**: Create, read, update, and delete items
- **Request Validation**: Using Zod for robust input validation
- **API Documentation**: Auto-generated Swagger and Scalar UI documentation
- **In-Memory Storage**: Simple in-memory data persistence

## How to Run the Application

### Prerequisites
- Node.js (v18 or higher)
- pnpm package manager

### Installation & Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup environment variables**:
   ```bash
   # Copy environment variables from example
   cp .env.example .env
   ```

3. **Start the application**:
   ```bash
   # Development mode
   pnpm run start

   # Development with auto-reload
   pnpm run start:dev

   # Production mode
   pnpm run start:prod
   ```

3. **Access the application**:
   - API Base URL: http://localhost:5090
   - Swagger UI: http://localhost:5090/api
   - Scalar UI: http://localhost:5090/scalar
   - OpenAPI JSON: http://localhost:5090/api-json

## API Endpoints

- `GET /items` - Get all items
- `GET /items/:id` - Get item by ID
- `POST /items` - Create new item
- `PATCH /items/:id` - Update item by ID
- `DELETE /items/:id` - Delete item by ID

## Design Decisions & Assumptions

### Request Validation with Zod
- **Decision**: Used Zod for request validation instead of class-validator
- **Rationale**: Zod provides excellent TypeScript integration and runtime type safety
- **Implementation**: Custom validation pipe that transforms Zod schemas into NestJS validation

### User Session Management
- **Assumption**: Fixed user ID for session management
- **Implementation**: All operations are associated with a hardcoded user ID
- **Rationale**: Simplified authentication for demonstration purposes

### In-Memory Storage
- **Decision**: Used in-memory storage instead of a database
- **Limitation**: All data is lost when the application restarts
- **Rationale**: Simplified setup for development and testing

## Additional Features

### Swagger Documentation Generation
- **Auto-generated API documentation** using `@nestjs/swagger`
- **Interactive API explorer** at `/api` endpoint
- **OpenAPI 3.0 specification** available at `/api-json`

### Scalar UI Integration
- **Modern API documentation interface** using `@scalar/nestjs-api-reference`
- **Enhanced developer experience** with better UI/UX than traditional Swagger
- **Alternative documentation view** at `/scalar` endpoint

## Testing

```bash
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Development Scripts

```bash
# Linting
pnpm run lint

# Code formatting
pnpm run format

# Build for production
pnpm run build
```

## Project Structure

```
src/
app.module.ts         # Main application module
main.ts               # Application entry point
config/               # Configuration files
app/items/            # Items module (controllers, services, DTOs)
types/                # TypeScript type definitions
validation/           # Custom validation pipes
```

## Important Notes

**Data Persistence**: This application uses in-memory storage. All data will be lost when the application is restarted.

**Configuration**: The application runs on port 5090 by default. This can be configured through environment variables.

**Documentation**: Both Swagger UI and Scalar UI are available for exploring the API interactively.
