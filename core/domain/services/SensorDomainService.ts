import type { Sensor } from "../entities/Sensor.ts";

export class SensorDomainService {
  createSensor(params: {
    id: string;
    id_sensor: string;
    slug: string;
    name: string;
    description: string;
    image: string;
  }): Sensor {
    const now = new Date();
    return {
      id: params.id,
      id_sensor: params.id_sensor,
      slug: params.slug,
      name: params.name,
      description: params.description,
      image: params.image,
      created_at: now,
      updated_at: now,
    };
  }
}
