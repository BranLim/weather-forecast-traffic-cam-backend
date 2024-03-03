import { SgLocation } from './SgLocation';

export interface LocationService {
  getLocations(datetime: string): Promise<SgLocation[]>;
}
