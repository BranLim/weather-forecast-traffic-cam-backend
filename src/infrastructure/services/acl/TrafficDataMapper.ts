import { TrafficData } from './TrafficData';
import { LocationInformation } from '../../../Domain/LocationInformation';

export const extractLocations = (
  trafficData: TrafficData,
): LocationInformation[] => {
  if (!trafficData || !trafficData.items) {
    return [];
  }
  return trafficData.items[0].cameras.map((camera) => {
    return {
      latitude: camera.location.latitude,
      longitude: camera.location.longitude,
    } as LocationInformation;
  });
};
