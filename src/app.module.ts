import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemModule } from './app/item/item.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './shared/configs/config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ItemModule,
  ],
  providers: [AppService],
})
export class AppModule {}
