import { Plant } from "../../domain/entities/Plant";
import { PlantRepositoryPort } from "../../domain/outbound/plant-repository.port";
import { PlantDomainService } from "../../domain/services/PlantDomainService";
import { CreatePlantDto, AssignSensorDto } from "../dtos/plant.dto";
import { PlantUseCasePort } from "../ports/in/plant-usecase.port";
export class PlantApplicationService implements PlantUseCasePort {
  constructor(
    private readonly plantRepo: PlantRepositoryPort,
    private readonly plantDomain: PlantDomainService
  ) {}

  private generateId(): string {
    return typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async createPlant(dto: CreatePlantDto): Promise<Plant> {
    const plant = this.plantDomain.createPlant({
      id: dto.id ?? this.generateId(),
      id_plant: dto.id_plant,
      slug: dto.slug,
      name: dto.name,
      scientific_name: dto.scientific_name,
      description: dto.description,
      image: dto.image,
      sensor_id: dto.sensor_id,
    });
    return this.plantRepo.save(plant);
  }

  async assignSensor(dto: AssignSensorDto): Promise<Plant> {
    const plant = await this.plantRepo.getList().then((list) =>
      list.find((p) => p.id === dto.plantId || p.id_plant === dto.plantId)
    );
    if (!plant) {
      throw new Error("Plant not found");
    }
    const updated = this.plantDomain.assignSensor(plant, dto.sensorId);
    return this.plantRepo.assignSensorToPlant(updated.id, updated.sensor_id!);
  }

  async getPlants(): Promise<Plant[]> {
    return this.plantRepo.getList();
  }
}
