import { describe, it, expect, vi, beforeEach } from "vitest";
import { SensorApplicationService } from "./SensorApplicationService";
import { MockSensorRepository } from "../../../infrastructure/adapters/mock/MockSensorRepository";
import { MockReadingRepository } from "../../../infrastructure/adapters/mock/MockReadingRepository";
import { MockPlantRepository } from "../../../infrastructure/adapters/mock/MockPlantRepository";
import { SensorDomainService } from "../../domain/services/SensorDomainService";
import { ReadingDomainService } from "../../domain/services/ReadingDomainService";
import type { Plant } from "../../domain/entities/Plant";
import type { Sensor } from "../../domain/entities/Sensor";

describe("F-004: takeReading riego con identificador incorrecto", () => {
  let sensorRepo: MockSensorRepository;
  let readingRepo: MockReadingRepository;
  let plantRepo: MockPlantRepository;
  let service: SensorApplicationService;

  const now = new Date();

  const mockSensor: Sensor = {
    id: "sensor-uuid-001",
    id_sensor: "S-001",
    slug: "sensor-001",
    name: "Sensor 001",
    description: "Sensor de humedad",
    image: "sensor.png",
    created_at: now,
    updated_at: now,
  };

  const mockPlant: Plant = {
    id: "plant-uuid-001",
    id_plant: "P-001",
    slug: "tomate",
    name: "Tomate",
    scientific_name: "Solanum lycopersicum",
    description: "Planta de tomate",
    image: "tomate.png",
    sensor_id: "sensor-uuid-001",
    created_at: now,
    updated_at: now,
  };

  beforeEach(() => {
    sensorRepo = new MockSensorRepository();
    readingRepo = new MockReadingRepository();
    plantRepo = new MockPlantRepository();
    service = new SensorApplicationService(
      sensorRepo,
      readingRepo,
      plantRepo,
      new SensorDomainService(),
      new ReadingDomainService()
    );
  });

  it("BUG CONFIRMADO: irrigatePlant recibe sensorId en vez de plantId y nunca encuentra la planta", async () => {
    await sensorRepo.save(mockSensor);
    await plantRepo.save(mockPlant);

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.takeReading({
      sensorId: "S-001",
      electrical_conductivity: 2.1,
      humidity: 35,
      temperature: 24,
    });

    const irrigateLog = consoleSpy.mock.calls.find((call) =>
      String(call[0]).includes("regando planta")
    );

    expect(irrigateLog).toBeDefined();
    expect(String(irrigateLog![0])).toContain("regando planta S-001");

    consoleSpy.mockRestore();
  });

  it("BUG CONFIRMADO: el nombre de la planta nunca aparece en el log de riego", async () => {
    await sensorRepo.save(mockSensor);
    await plantRepo.save(mockPlant);

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await service.takeReading({
      sensorId: "S-001",
      electrical_conductivity: 2.1,
      humidity: 35,
      temperature: 24,
    });

    const irrigateLog = consoleSpy.mock.calls.find((call) =>
      String(call[0]).includes("regando planta")
    );

    expect(irrigateLog).toBeDefined();
    expect(String(irrigateLog![0])).not.toContain("Tomate");

    consoleSpy.mockRestore();
  });
});
