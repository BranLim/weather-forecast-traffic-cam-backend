import { Module } from '@nestjs/common';
import { LocationController } from './application/controllers/location.controller';
import { AppService } from './application/services/app.service';
import { HttpModule } from '@nestjs/axios';
import { GovDataLocationService } from './infrastructure/GovDataLocationService';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [
    AppService,
    { provide: 'LocationService',
      useClass: GovDataLocationService },
  ],
})
export class AppModule {}
