import { Module } from '@nestjs/common';
import { LocationController } from './application/controllers/location.controller';
import { AppService } from './application/services/app.service';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [AppService],
})
export class AppModule {}
