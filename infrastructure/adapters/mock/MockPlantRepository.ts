import type { Plant } from "../../../core/domain/entities/Plant.ts";
import type { PlantRepositoryPort } from "../../../core/domain/outbound/plant-repository.port.ts";

export class MockPlantRepository implements PlantRepositoryPort {
  private plants: Plant[] = [];

  async save(plant: Plant): Promise<Plant> {
    const idx = this.plants.findIndex((p) => p.id === plant.id);
    if (idx >= 0) {
      this.plants[idx] = plant;
    } else {
      this.plants.push(plant);
    }
    return plant;
  }

  async assignSensorToPlant(plantId: string, sensorId: string): Promise<Plant> {
    const idx = this.plants.findIndex((p) => p.id === plantId || p.id_plant === plantId);
    if (idx < 0) {
      throw new Error("Plant not found");
    }
    this.plants[idx] = {
      ...this.plants[idx],
      sensor_id: sensorId,
      updated_at: new Date(),
    };
    return this.plants[idx];
  }

  async getList(): Promise<Plant[]> {
    return [...this.plants];
  }

  seed(plants: Plant[]): void {
    this.plants = [...plants];
  }
}
