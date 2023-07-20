
import {z} from 'zod';

export const StationScheduleSchema = z.object({
  schedules: z.array(z.object({
    departure_time: z.number().positive().int(),
    destination: z.string(),
  }))
});