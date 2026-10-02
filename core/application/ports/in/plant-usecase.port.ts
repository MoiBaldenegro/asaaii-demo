import { Plant } from "../../../domain/entities/Plant";
import { CreatePlantDto, AssignSensorDto } from "../../dtos/plant.dto";

export interface PlantUseCasePort {
  createPlant(dto: CreatePlantDto): Promise<Plant>;
  assignSensor(dto: AssignSensorDto): Promise<Plant>;
  getPlants(): Promise<Plant[]>;
}
