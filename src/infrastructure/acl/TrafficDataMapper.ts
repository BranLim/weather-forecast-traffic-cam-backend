import { TrafficData } from './TrafficData';
import { SgLocation } from '../../Domain/SgLocation';

export const extractLocations = (trafficData: TrafficData): SgLocation[] => {
  if (!trafficData || !trafficData.items) {
    return [];
  }
  const locations: SgLocation[] = trafficData.items[0].cameras.map((camera) => {
    return {
      latitude: camera.location.latitude,
      longitude: camera.location.longitude,
    } as SgLocation;
  });
  return locations;
};
