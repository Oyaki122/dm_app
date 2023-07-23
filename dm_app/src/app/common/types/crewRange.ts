import {z} from 'zod';

export const CrewRangeSchema = z.object({
  'range': z.array(z.object({
    train_id: z.number(),
    conductor_id: z.number(),
    driver_id: z.number(),
    station_id: z.number(),
  })),
});