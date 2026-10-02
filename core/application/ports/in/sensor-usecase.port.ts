import { Sensor } from "../../../domain/entities/Sensor";
import { SensorReading } from "../../../domain/entities/SensorReading";
import { CreateSensorDto, TakeReadingDto } from "../../dtos/sensor.dto";

export interface SensorUseCasePort {
  createSensor(dto: CreateSensorDto): Promise<Sensor>;
  getSensors(): Promise<Sensor[]>;
  takeReading(dto: TakeReadingDto): Promise<SensorReading>;
  irrigatePlant(plantId: string): Promise<void>;
}
