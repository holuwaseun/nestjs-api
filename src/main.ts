import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { scalarConfig, swaggerConfig } from './config/swagger.config';
import { T_ServerConfig } from './types/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const SERVER = configService.get<T_ServerConfig>('SERVER');

  if (!SERVER) {
    throw new Error('Server configuration missing');
  }

  // Enable CORS for development
  app.enableCors();

  // Swagger/OpenAPI documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      persistAuthorization: true,
      showRequestDuration: true,
    },
  });

  // Setup Scalar UI - modern alternative to Swagger UI
  const { apiReference } = require('@scalar/nestjs-api-reference');
  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: document,
      },
      ...scalarConfig,
    }),
  );

  // Also serve the OpenAPI JSON spec
  app.use('/api-json', (req: any, res: any) => {
    res.json(document);
  });

  await app.listen(SERVER.PORT);

  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                     🚀 Application Started                     ║
╠════════════════════════════════════════════════════════════════╣
║  Application:     http://localhost:${SERVER.PORT}              ║
║  Swagger UI:      http://localhost:${SERVER.PORT}/api          ║
║  Scalar UI:       http://localhost:${SERVER.PORT}/scalar       ║
║  OpenAPI JSON:    http://localhost:${SERVER.PORT}/api-json     ║
╚════════════════════════════════════════════════════════════════╝
  `);
}
void bootstrap();
