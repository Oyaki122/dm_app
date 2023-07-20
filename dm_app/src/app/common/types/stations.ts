import {z} from 'zod';

export const StationSchema = z.object({
  stations: z.array(z.object({
    station_id: z.number().positive().int(),
    name: z.string(),
    city: z.string(),
    line: z.string()
  }))
});