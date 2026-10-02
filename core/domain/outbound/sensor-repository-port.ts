import { Sensor } from "../entities/Sensor";

export interface SensorRepositoryPort {
  save(sensor: Sensor): Promise<Sensor>;
  getById(id: string): Promise<Sensor | null>;
  getByIdSensor(idSensor: string): Promise<Sensor | null>;
  getList(): Promise<Sensor[]>;
}
