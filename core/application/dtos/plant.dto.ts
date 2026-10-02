export interface CreatePlantDto {
  id?: string;
  id_plant: string;
  slug: string;
  name: string;
  scientific_name: string;
  description: string;
  image: string;
  sensor_id?: string;
}

export interface AssignSensorDto {
  plantId: string;
  sensorId: string;
}
