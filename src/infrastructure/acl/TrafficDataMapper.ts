import { TrafficData } from './TrafficData';
import { Location } from '../../Domain/Location';

export const toLocations = (trafficData: TrafficData): Location[] => {
  if (!trafficData || !trafficData.items) {
    return [];
  }
  const locations: Location[] = trafficData.items[0].cameras.map((camera) => {
    return {
      latitude: camera.location.latitude,
      longitude: camera.location.longitude,
      image : camera.image
    } as Location
  });
  return locations;
};
