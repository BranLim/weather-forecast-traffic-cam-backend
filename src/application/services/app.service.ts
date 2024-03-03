import { Inject, Injectable } from '@nestjs/common';
import { SgLocation } from '../../Domain/SgLocation';
import { LocationService } from '../../Domain/LocationService';

@Injectable()
export class AppService {
  constructor(
    @Inject('LocationService')
    private readonly locationService: LocationService,
  ) {}

  async getLocation(datetime: string): Promise<SgLocation[]> {
    return await this.locationService.getLocations(datetime);
  }
}
