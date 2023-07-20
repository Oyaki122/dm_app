import {z} from 'zod';

export const DriverSchema = z.object({
  drivers: z.array(z.object({
    driver_id: z.number().positive().int(),
    name: z.string(),
    affilitation: z.string()
  }))
});
