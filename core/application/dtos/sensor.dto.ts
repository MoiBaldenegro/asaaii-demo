export interface CreateSensorDto {
  id?: string;
  id_sensor: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface TakeReadingDto {
  sensorId: string;
  electrical_conductivity?: number;
  humidity?: number;
  temperature?: number;
}
