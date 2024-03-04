import { Module } from '@nestjs/common';
import { LocationController } from './application/controllers/location.controller';
import { AppService } from './application/services/app.service';
import { HttpModule } from '@nestjs/axios';
import { GovDataLocationService } from './infrastructure/services/GovDataLocationService';
import { SequelizeSGRegionRepository } from './infrastructure/database/SequelizeSGRegionRepository';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [
    AppService,
    {
      provide: 'LocationService',
      useClass: GovDataLocationService,
    },
    {
      provide: 'SGRegionRepository',
      useClass: SequelizeSGRegionRepository,
    },
  ],
})
export class AppModule {}
