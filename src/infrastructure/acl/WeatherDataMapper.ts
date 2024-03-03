import { EnvironmentData } from './WeatherForecastData';
import { SgLocation } from '../../Domain/SgLocation';

export const extractAreaInfo = (
  environmentData: EnvironmentData,
): SgLocation[] => {
  if (!environmentData) {
    return [];
  }
  const locations: SgLocation[] = environmentData.area_metadata.map(
    (areaInfo) => {
      return {
        name: areaInfo.name,
        latitude: areaInfo.label_location.latitude,
        longitude: areaInfo.label_location.longitude,
      };
    },
  );
  return locations;
};
