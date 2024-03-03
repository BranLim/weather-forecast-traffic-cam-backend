import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { toLocations } from './acl/TrafficDataMapper';
import { Location } from '../Domain/Location';

@Injectable()
export class TrafficService {
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.DATA_API_BASE_URL;
  }

  async getTrafficLocations(datetime: string): Promise<Location[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/transport/traffic-images`, {
        params: { data_time: datetime },
      }),
    );
    console.log(data);
    return toLocations(data);
  }
}
