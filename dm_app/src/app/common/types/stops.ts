import {z} from 'zod';

export const DateSchema = z.custom<number>((val) => {
  if (typeof val !== 'number') return false;
  const hour = val / 100;
  const min = val % 100;
  if (hour < 0 || hour > 24 || min < 0 || min > 59) {
    return false;
  }
  return true;
});

export const StopsSchema = z.object({
  stops: z.array(z.object({
    'train_id': z.number(),
    'station_id': z.number(),
    'arrival_time': DateSchema.nullish(),
    'departure_time': DateSchema.nullish(),
  }))});