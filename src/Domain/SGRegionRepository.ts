import { LocationInformation } from './LocationInformation';

export interface SGRegionRepository {
  create(locationInformation: LocationInformation);

  find(latitude: number, longitude: number): Promise<LocationInformation>;
}