import { SensorReading } from "../../../core/domain/entities/SensorReading";
import { ReadingRepositoryPort } from "../../../core/domain/outbound/reading-repository.port";

export class MockReadingRepository implements ReadingRepositoryPort {
  private readings: Array<SensorReading & { sensorId: string }> = [];

  async save(reading: SensorReading, sensorId: string): Promise<SensorReading> {
    this.readings.push({ ...reading, sensorId });
    console.log(
      `lectura guardada sensor=${sensorId}: EC=${reading.electrical_conductivity}, H=${reading.humidity}, T=${reading.temperature}`
    );
    return reading;
  }

  async getById(id: string): Promise<SensorReading | null> {
    const r = this.readings.find((x) => x.id === id);
    return r ? { id: r.id, electrical_conductivity: r.electrical_conductivity, humidity: r.humidity, temperature: r.temperature } : null;
  }

  async getLatestBySensorId(sensorId: string): Promise<SensorReading | null> {
    const r = [...this.readings].reverse().find((x) => x.sensorId === sensorId);
    return r ? { id: r.id, electrical_conductivity: r.electrical_conductivity, humidity: r.humidity, temperature: r.temperature } : null;
  }

  async getAllBySensorId(sensorId: string): Promise<SensorReading[]> {
    return this.readings
      .filter((x) => x.sensorId === sensorId)
      .map((r) => ({ id: r.id, electrical_conductivity: r.electrical_conductivity, humidity: r.humidity, temperature: r.temperature }));
  }
}
