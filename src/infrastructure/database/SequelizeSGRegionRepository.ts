import { Injectable } from '@nestjs/common';
import { SGRegionRepository } from '../../Domain/SGRegionRepository';
import { LocationInformation } from 'src/Domain/LocationInformation';

@Injectable()
export class SequelizeSGRegionRepository implements SGRegionRepository {
  constructor() {}

  async create(locationInformation: LocationInformation) {
    throw new Error('Method not implemented.');
  }

  async find(
    latitude: number,
    longitude: number,
  ): Promise<LocationInformation> {
    throw new Error('Method not implemented.');
  }
}
