import { EnvironmentData } from './WeatherForecastData';
import { LocationInformation } from '../../../Domain/LocationInformation';

export const extractAreaInfo = (
  environmentData: EnvironmentData,
): LocationInformation[] => {
  if (!environmentData) {
    return [];
  }
  return environmentData.area_metadata.map((areaInfo) => {
    return {
      name: areaInfo.name,
      latitude: areaInfo.label_location.latitude,
      longitude: areaInfo.label_location.longitude,
    };
  });
};
