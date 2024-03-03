import { Module } from '@nestjs/common';
import { LocationController } from './application/controllers/location.controller';
import { AppService } from './application/services/app.service';
import {HttpModule} from "@nestjs/axios";
import {TrafficService} from "./infrastructure/TrafficService";

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [AppService, TrafficService],
})
export class AppModule {}
