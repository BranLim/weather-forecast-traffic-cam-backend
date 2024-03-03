export type AreaDetail = {
  longitude: number;
  latitude: number;
};

export type AreaInfo = {
  name: string;
  label_location: AreaDetail;
};

export type ForecastValidity = {
  start: string;
  end: string;
};

export type WeatherForecast = {
  area: string;
  forecast: string;
};

export type WeatherForecastInfo = {
  update_timestamp: string;
  timestamp: string;
  valid_period: ForecastValidity;
  forecasts: WeatherForecast[];
};

export type EnvironmentData = {
  api_info: { status: string };
  area_metadata: AreaInfo[];
  items: WeatherForecastInfo[];
};
