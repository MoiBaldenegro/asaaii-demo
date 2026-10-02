import { Sensor } from "../../../core/domain/entities/Sensor";
import { SensorRepositoryPort } from "../../../core/domain/outbound/sensor-repository-port";

export class MockSensorRepository implements SensorRepositoryPort {
  private sensors: Sensor[] = [];

  async save(sensor: Sensor): Promise<Sensor> {
    const idx = this.sensors.findIndex((s) => s.id === sensor.id);
    if (idx >= 0) {
      this.sensors[idx] = sensor;
    } else {
      this.sensors.push(sensor);
    }
    return sensor;
  }

  async getById(id: string): Promise<Sensor | null> {
    return this.sensors.find((s) => s.id === id) ?? null;
  }

  async getByIdSensor(idSensor: string): Promise<Sensor | null> {
    return this.sensors.find((s) => s.id_sensor === idSensor) ?? null;
  }

  async getList(): Promise<Sensor[]> {
    return [...this.sensors];
  }

  seed(sensors: Sensor[]): void {
    this.sensors = [...sensors];
  }
}
