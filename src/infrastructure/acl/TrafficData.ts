export type TrafficCameraLocation = {
  latitude: string;
  longitude: string;
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
}

export type TrafficData = {
  items: TrafficDataItem [];
};
