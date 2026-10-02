import { MockPlantRepository } from "./infrastructure/adapters/mock/MockPlantRepository";
import { MockSensorRepository } from "./infrastructure/adapters/mock/MockSensorRepository";
import { MockReadingRepository } from "./infrastructure/adapters/mock/MockReadingRepository";
import { PlantDomainService } from "./core/domain/services/PlantDomainService";
import { SensorDomainService } from "./core/domain/services/SensorDomainService";
import { ReadingDomainService } from "./core/domain/services/ReadingDomainService";
import { PlantApplicationService } from "./core/application/services/PlantApplicationService";
import { SensorApplicationService } from "./core/application/services/SensorApplicationService";

const plantRepo = new MockPlantRepository();
const sensorRepo = new MockSensorRepository();
const readingRepo = new MockReadingRepository();

const plantDomain = new PlantDomainService();
const sensorDomain = new SensorDomainService();
const readingDomain = new ReadingDomainService();

const plantService = new PlantApplicationService(plantRepo, plantDomain);
const sensorService = new SensorApplicationService(
  sensorRepo,
  readingRepo,
  plantRepo,
  sensorDomain,
  readingDomain
);

async function main() {
  const sensor = await sensorService.createSensor({
    id_sensor: "S-001",
    slug: "sensor-001",
    name: "Sensor 001",
    description: "Sensor de humedad y temperatura",
    image: "sensor.png",
  });

  const plant = await plantService.createPlant({
    id_plant: "P-001",
    slug: "tomate",
    name: "Tomate",
    scientific_name: "Solanum lycopersicum",
    description: "Planta de tomate",
    image: "tomate.png",
  });

  await plantService.assignSensor({ plantId: plant.id, sensorId: sensor.id });
  await sensorService.takeReading({
    sensorId: sensor.id_sensor,
    electrical_conductivity: 2.1,
    humidity: 65,
    temperature: 24,
  });
  await sensorService.irrigatePlant(plant.id);
  console.log("done");
}

main();
