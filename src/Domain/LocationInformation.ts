import { WeatherInformation } from './WeatherInformation';

export type LocationInformation = {
  name: string;
  latitude: number;
  longitude: number;
};

export type Location = {
  locationInfo: LocationInformation;
  locationWeather: WeatherInformation;
  locationImage: string;
};
