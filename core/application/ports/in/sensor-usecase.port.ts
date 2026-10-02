import type { Sensor } from "../../../domain/entities/Sensor.ts";
import type { SensorReading } from "../../../domain/entities/SensorReading.ts";
import type { CreateSensorDto, TakeReadingDto } from "../../dtos/sensor.dto.ts";

export interface SensorUseCasePort {
  createSensor(dto: CreateSensorDto): Promise<Sensor>;
  getSensors(): Promise<Sensor[]>;
  takeReading(dto: TakeReadingDto): Promise<SensorReading>;
  irrigatePlant(plantId: string): Promise<void>;
}
