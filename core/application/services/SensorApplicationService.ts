import type { Sensor } from "../../domain/entities/Sensor.ts";
import type { SensorReading } from "../../domain/entities/SensorReading.ts";
import type { SensorRepositoryPort } from "../../domain/outbound/sensor-repository-port.ts";
import type { ReadingRepositoryPort } from "../../domain/outbound/reading-repository.port.ts";
import type { PlantRepositoryPort } from "../../domain/outbound/plant-repository.port.ts";
import { SensorDomainService } from "../../domain/services/SensorDomainService.ts";
import { ReadingDomainService } from "../../domain/services/ReadingDomainService.ts";
import type { CreateSensorDto, TakeReadingDto } from "../dtos/sensor.dto.ts";
import type { SensorUseCasePort } from "../ports/in/sensor-usecase.port.ts";
export class SensorApplicationService implements SensorUseCasePort {
  private readonly sensorRepo: SensorRepositoryPort;
  private readonly readingRepo: ReadingRepositoryPort;
  private readonly plantRepo: PlantRepositoryPort;
  private readonly sensorDomain: SensorDomainService;
  private readonly readingDomain: ReadingDomainService;

  constructor(
    sensorRepo: SensorRepositoryPort,
    readingRepo: ReadingRepositoryPort,
    plantRepo: PlantRepositoryPort,
    sensorDomain: SensorDomainService,
    readingDomain: ReadingDomainService
  ) {
    this.sensorRepo = sensorRepo;
    this.readingRepo = readingRepo;
    this.plantRepo = plantRepo;
    this.sensorDomain = sensorDomain;
    this.readingDomain = readingDomain;
  }

  private generateId(): string {
    return typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async createSensor(dto: CreateSensorDto): Promise<Sensor> {
    const sensor = this.sensorDomain.createSensor({
      id: dto.id ?? this.generateId(),
      id_sensor: dto.id_sensor,
      slug: dto.slug,
      name: dto.name,
      description: dto.description,
      image: dto.image,
    });
    return this.sensorRepo.save(sensor);
  }

  async getSensors(): Promise<Sensor[]> {
    return this.sensorRepo.getList();
  }

  async takeReading(dto: TakeReadingDto): Promise<SensorReading> {
    const sensor = await this.sensorRepo.getByIdSensor(dto.sensorId).catch(() => null);
    const sensorId = sensor ? sensor.id : dto.sensorId;
    const reading = this.readingDomain.createReading({
      id: this.generateId(),
      electrical_conductivity: dto.electrical_conductivity ?? 0,
      humidity: dto.humidity ?? 0,
      temperature: dto.temperature ?? 0,
    });
    const savedReading = await this.readingRepo.save(reading, sensorId);
    if(reading.humidity < 40) {
      this.irrigatePlant(sensorId).catch((err) => console.error("Error irrigating plant:", err));
    }
    return savedReading;
  }

  async irrigatePlant(plantId: string): Promise<void> {
    const plants = await this.plantRepo.getList();
    const plant = plants.find((p) => p.id === plantId || p.id_plant === plantId);
    const name = plant?.name ?? plantId;
    console.log(`regando planta ${name}`);
  }
}
