import type { Plant } from "../../../domain/entities/Plant.ts";
import type { CreatePlantDto, AssignSensorDto } from "../../dtos/plant.dto.ts";

export interface PlantUseCasePort {
  createPlant(dto: CreatePlantDto): Promise<Plant>;
  assignSensor(dto: AssignSensorDto): Promise<Plant>;
  getPlants(): Promise<Plant[]>;
}
