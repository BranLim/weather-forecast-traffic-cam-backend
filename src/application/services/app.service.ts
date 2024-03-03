import { Injectable } from '@nestjs/common';
import { TrafficService } from '../../infrastructure/TrafficService';
import {TrafficImage} from "../../infrastructure/acl/TrafficImage";

@Injectable()
export class AppService {
  constructor(private trafficService: TrafficService) {}

  async getLocation(datetime:string): Promise<TrafficImage>{
    return await this.trafficService.getTrafficLocations(datetime);
  }
}
