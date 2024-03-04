import { Inject, Injectable } from '@nestjs/common';
import { LocationInformation } from '../../Domain/LocationInformation';
import { LocationService } from '../../Domain/LocationService';

@Injectable()
export class AppService {
  constructor(
    @Inject('LocationService')
    private readonly locationService: LocationService,
  ) {}

  async getLocation(datetime: string): Promise<LocationInformation[]> {
    return await this.locationService.getLocations(datetime);
  }
}
