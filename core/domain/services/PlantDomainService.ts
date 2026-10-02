import { Plant } from "../entities/Plant";

export class PlantDomainService {
  createPlant(params: {
    id: string;
    id_plant: string;
    slug: string;
    name: string;
    scientific_name: string;
    description: string;
    image: string;
    sensor_id?: string;
  }): Plant {
    const now = new Date();
    return {
      id: params.id,
      id_plant: params.id_plant,
      slug: params.slug,
      name: params.name,
      scientific_name: params.scientific_name,
      description: params.description,
      image: params.image,
      sensor_id: params.sensor_id,
      created_at: now,
      updated_at: now,
    };
  }

  assignSensor(plant: Plant, sensorId: string): Plant {
    return {
      ...plant,
      sensor_id: sensorId,
      updated_at: new Date(),
    };
  }
}
