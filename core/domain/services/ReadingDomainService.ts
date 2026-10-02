import { SensorReading } from "../entities/SensorReading";

export class ReadingDomainService {
  createReading(params: {
    id: string;
    electrical_conductivity: number;
    humidity: number;
    temperature: number;
  }): SensorReading {
    return {
      id: params.id,
      electrical_conductivity: params.electrical_conductivity,
      humidity: params.humidity,
      temperature: params.temperature,
    };
  }
}
