import { MockPlantRepository } from "./infrastructure/adapters/mock/MockPlantRepository.ts";
import { MockSensorRepository } from "./infrastructure/adapters/mock/MockSensorRepository.ts";
import { MockReadingRepository } from "./infrastructure/adapters/mock/MockReadingRepository.ts";
import { PlantDomainService } from "./core/domain/services/PlantDomainService.ts";
import { SensorDomainService } from "./core/domain/services/SensorDomainService.ts";
import { ReadingDomainService } from "./core/domain/services/ReadingDomainService.ts";
import { PlantApplicationService } from "./core/application/services/PlantApplicationService.ts";
import { SensorApplicationService } from "./core/application/services/SensorApplicationService.ts";

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

function log(icon: string, message: string) {
  console.log(`${icon} ${message}`);
}

async function main() {
  log("🌱", "Creando sensor...");
  const sensor = await sensorService.createSensor({
    id_sensor: "S-001",
    slug: "sensor-001",
    name: "Sensor 001",
    description: "Sensor de humedad y temperatura",
    image: "sensor.png",
  });
  log("✅", `Sensor creado: ${sensor.name} (${sensor.id_sensor})`);

  log("🌿", "Creando planta...");
  const plant = await plantService.createPlant({
    id_plant: "P-001",
    slug: "tomate",
    name: "Tomate",
    scientific_name: "Solanum lycopersicum",
    description: "Planta de tomate",
    image: "tomate.png",
  });
  log("✅", `Planta creada: ${plant.name} (${plant.id_plant})`);

  log("🔗", "Asignando sensor a planta...");
  await plantService.assignSensor({ plantId: plant.id, sensorId: sensor.id });
  log("✅", `Sensor ${sensor.id_sensor} asignado a ${plant.name}`);

  log("📊", "Tomando lectura...");
  await sensorService.takeReading({
    sensorId: sensor.id_sensor,
    electrical_conductivity: 2.1,
    humidity: 40,
    temperature: 24,
  });

  log("🎉", "Proceso completado exitosamente");
}

main();
