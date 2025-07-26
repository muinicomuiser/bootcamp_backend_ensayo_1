import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesController } from './planes/planes.controller';

@Module({
  imports: [],
  controllers: [AppController, PlanesController],
  providers: [AppService],
})
export class AppModule {}
