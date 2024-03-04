import { LocationInformation } from './LocationInformation';

export interface LocationService {
  getLocations(datetime: string): Promise<LocationInformation[]>;
}
