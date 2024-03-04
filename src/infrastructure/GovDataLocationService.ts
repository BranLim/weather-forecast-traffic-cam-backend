import { Injectable, Logger } from '@nestjs/common';
import { LocationService } from '../Domain/LocationService';
import { HttpService } from '@nestjs/axios';
import { LocationInformation } from 'src/Domain/LocationInformation';
import { catchError, lastValueFrom, map, switchMap } from 'rxjs';
import { extractLocations } from './acl/TrafficDataMapper';
import { extractAreaInfo } from './acl/WeatherDataMapper';
import { TrafficData } from './acl/TrafficData';
import { EnvironmentData } from './acl/WeatherForecastData';

@Injectable()
export class GovDataLocationService implements LocationService {
  private baseUrl: string;
  private readonly logger = new Logger(GovDataLocationService.name);

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.DATA_API_BASE_URL;
  }

  async getLocations(datetime: string): Promise<LocationInformation[]> {
    if (!datetime) {
      throw new Error('no datetime provided');
    }

    const trafficDataRequest = this.httpService
      .get<TrafficData>(
        `${this.baseUrl}/transport/traffic-images?date_time=${datetime}`,
      )
      .pipe(
        map((response) => {
          this.logger.log('Received data for traffic locations');
          return extractLocations(response.data);
        }),
      )
      .pipe(
        catchError((err) => {
          this.logger.error('Error calling traffic endpoint', err);
          return [];
        }),
      )
      .pipe(
        switchMap(async (trafficLocations) => {
          const environmentDataRequest = this.httpService
            .get<EnvironmentData>(
              `${this.baseUrl}/environment/2-hour-forecast?date_time=${datetime}`,
            )
            .pipe(
              map((response) => {
                this.logger.log('Received data for weather forecast');
                return extractAreaInfo(response.data);
              }),
            )
            .pipe(
              catchError((err) => {
                this.logger.error('Error calling weather endpoint', err);
                return [];
              }),
            );

          const locationInformation: LocationInformation[] =
            await lastValueFrom(environmentDataRequest, {
              defaultValue: [],
            });

          return this.populateLocationName(
            trafficLocations,
            locationInformation,
          );
        }),
      );

    const locations: LocationInformation[] = await lastValueFrom(
      trafficDataRequest,
      {
        defaultValue: [],
      },
    );

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

  private populateLocationName(
    trafficLocations: LocationInformation[],
    locationInformation: LocationInformation[],
  ): LocationInformation[] {
    return trafficLocations.map((location) => {
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
      return location;
    });
  }
}
