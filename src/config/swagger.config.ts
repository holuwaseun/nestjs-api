import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS Item Management API')
  .setDescription(
    `
    ## Overview
    This API provides endpoints for managing items in an inventory system.
    
    ## Features
    - Create, read, update, and delete items
    - Filter items by various properties
    - Paginated listing of items
    - Category-based organization
    
    ## Authentication
    Currently using a fixed user ID for demo purposes. In production, this would be replaced with proper JWT authentication.
    
    ## Available Categories
    - accessories
    - bottoms
    - dresses
    - outerwear
    - shoes
    - tops
    `,
  )
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .addServer('http://localhost:3000', 'Local Development')
  .addServer('https://api.example.com', 'Production')
  .setContact(
    'API Support',
    'https://github.com/yourusername/nestjs-api',
    'support@example.com',
  )
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .build();

export const scalarConfig = {
  theme: 'purple',
  hideModels: false,
  hideDownloadButton: false,
  darkMode: true,
  customCss: `
    .scalar-api-reference {
      --scalar-font-family: 'Inter', system-ui, sans-serif;
    }
  `,
};