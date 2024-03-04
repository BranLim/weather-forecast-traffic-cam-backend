export type TrafficCameraLocation = {
  latitude: number;
  longitude: number;
};
export type TrafficCamera = {
  timestamp: string;
  image: string;
  location: TrafficCameraLocation;
  camera_id: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
};

export type TrafficDataItem = {
  timestamp: string;
  cameras: TrafficCamera[];
};

export type TrafficData = {
  api_info: { status: string };
  items: TrafficDataItem[];
};
