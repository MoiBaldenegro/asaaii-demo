import type { Sensor } from "../entities/Sensor.ts";

export interface SensorRepositoryPort {
  save(sensor: Sensor): Promise<Sensor>;
  getById(id: string): Promise<Sensor | null>;
  getByIdSensor(idSensor: string): Promise<Sensor | null>;
  getList(): Promise<Sensor[]>;
}
