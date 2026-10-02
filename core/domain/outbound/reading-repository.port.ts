import { SensorReading } from "../entities/SensorReading";

export interface ReadingRepositoryPort {
  save(reading: SensorReading, sensorId: string): Promise<SensorReading>;
  getById(id: string): Promise<SensorReading | null>;
  getLatestBySensorId(sensorId: string): Promise<SensorReading | null>;
  getAllBySensorId(sensorId: string): Promise<SensorReading[]>;
}
