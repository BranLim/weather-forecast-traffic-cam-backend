import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TrafficImage } from './acl/TrafficImage';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class TrafficService {
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.DATA_API_BASE_URL;
  }

  async getTrafficLocations(datetime: string): Promise<TrafficImage> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/transport/traffic-images`, {
        params: { data_time: datetime },
      }),
    );
    return data as TrafficImage;
  }
}
