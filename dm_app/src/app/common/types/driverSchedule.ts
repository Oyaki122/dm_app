import {z} from 'zod';

export const DriverScheduleSchema = z.object({
  schedules: z.array(
    z.object({
      train_id: z.number().positive().int(),
      driver_id: z.number().positive().int(),
      name: z.string(),
      arrival_time: z.number().nullish(),
      departure_time: z.number().nullish()
    })
  )
});