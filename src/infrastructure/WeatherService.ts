import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';
import { firstValueFrom } from 'rxjs';
import { extractAreaInfo } from './acl/WeatherDataMapper';

@Injectable()
export class WeatherService {
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.DATA_API_BASE_URL;
  }

  async getLocationInfo(datetime: string): Promise<{}[]> {
    if (!datetime) {
      throw new Error('no datetime provided');
    }
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/environment/2-hour-forecast?date_time=${datetime}`,
      ),
    );
    return extractAreaInfo(data);
  }
}
