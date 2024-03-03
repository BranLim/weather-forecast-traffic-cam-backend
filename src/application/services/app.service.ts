import { Injectable } from '@nestjs/common';
import { TrafficService } from '../../infrastructure/TrafficService';
import { TrafficData } from '../../infrastructure/acl/TrafficData';
import { Location } from '../../Domain/Location'

@Injectable()
export class AppService {
  constructor(private trafficService: TrafficService) {}

  async getLocation(datetime: string): Promise<Location[]> {
    return await this.trafficService.getTrafficLocations(datetime);
  }
}
