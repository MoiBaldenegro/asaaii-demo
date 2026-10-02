import { Sensor } from "../../domain/entities/Sensor";
import { SensorReading } from "../../domain/entities/SensorReading";
import { SensorRepositoryPort } from "../../domain/outbound/sensor-repository-port";
import { ReadingRepositoryPort } from "../../domain/outbound/reading-repository.port";
import { PlantRepositoryPort } from "../../domain/outbound/plant-repository.port";
import { SensorDomainService } from "../../domain/services/SensorDomainService";
import { ReadingDomainService } from "../../domain/services/ReadingDomainService";
import { CreateSensorDto, TakeReadingDto } from "../dtos/sensor.dto";
import { SensorUseCasePort } from "../ports/in/sensor-usecase.port";
export class SensorApplicationService implements SensorUseCasePort {
  constructor(
    private readonly sensorRepo: SensorRepositoryPort,
    private readonly readingRepo: ReadingRepositoryPort,
    private readonly plantRepo: PlantRepositoryPort,
    private readonly sensorDomain: SensorDomainService,
    private readonly readingDomain: ReadingDomainService
  ) {}

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
    return this.readingRepo.save(reading, sensorId);
  }

  async irrigatePlant(plantId: string): Promise<void> {
    const plants = await this.plantRepo.getList();
    const plant = plants.find((p) => p.id === plantId || p.id_plant === plantId);
    const name = plant?.name ?? plantId;
    console.log(`regando planta ${name}`);
  }
}
