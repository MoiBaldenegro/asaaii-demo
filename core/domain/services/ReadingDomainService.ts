import type { SensorReading } from "../entities/SensorReading.ts";

export class ReadingDomainService {
  createReading(params: {
    id: string;
    plant_id: string;
    sensor_id: string;
    electrical_conductivity: number;
    humidity: number;
    temperature: number;
  }): SensorReading {
    return {
      id: params.id,
      plant_id: params.plant_id,
      sensor_id: params.sensor_id,
      electrical_conductivity: params.electrical_conductivity,
      humidity: params.humidity,
      temperature: params.temperature,
    };
  }
}
