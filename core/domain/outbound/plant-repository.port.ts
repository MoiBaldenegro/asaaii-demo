import { Plant } from "../entities/Plant";

export interface PlantRepositoryPort{
    save(plant: Plant): Promise<Plant>,
    assignSensorToPlant(plantId: string, sensorId: string): Promise<Plant>,
    getList(): Promise<Plant[]>
}