import { Injectable } from '@nestjs/common';
import { LocationService } from '../Domain/LocationService';
import { HttpService } from '@nestjs/axios';
import { SgLocation } from 'src/Domain/SgLocation';
import { catchError, firstValueFrom, forkJoin, lastValueFrom, map } from 'rxjs';
import { extractLocations } from './acl/TrafficDataMapper';
import { extractAreaInfo } from './acl/WeatherDataMapper';
import { TrafficData } from './acl/TrafficData';
import { EnvironmentData } from './acl/WeatherForecastData';
import { AxiosError } from 'axios';
import { response } from 'express';

@Injectable()
export class GovDataLocationService implements LocationService {
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.DATA_API_BASE_URL;
  }

  async getLocations(datetime: string): Promise<SgLocation[]> {
    if (!datetime) {
      throw new Error('no datetime provided');
    }

    const trafficResponse = await this.httpService.axiosRef.get<TrafficData>(
      `${this.baseUrl}/transport/traffic-images?date_time=${datetime}`,
    );

    const environmentResponse =
      await this.httpService.axiosRef.get<EnvironmentData>(
        `${this.baseUrl}/environment/2-hour-forecast?date_time=${datetime}`,
      );

    let locations = extractLocations(trafficResponse.data);
    const locationInformation = extractAreaInfo(environmentResponse.data);

    locations = locations.map((location) => {
      const foundLocation = locationInformation.find((l) =>
        this.areCoordinatesEqual(
          location.latitude,
          location.longitude,
          l.latitude,
          l.longitude,
        ),
      );
      if (foundLocation) {
        return {
          ...location,
          name: foundLocation.name,
        };
      }
    });

    return locations;
  }

  private areCoordinatesEqual(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    epsilon: number = 0.000001,
  ): boolean {
    return Math.abs(lat1 - lat2) < epsilon && Math.abs(lon1 - lon2) < epsilon;
  }
}
