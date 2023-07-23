import {z} from 'zod';

export const TrainsSchema = z.object({
  'trains': z.array(z.object({
    'train_id': z.number(),
    'origin': z.number(),
    'destinaion': z.number(),
    'car': z.number(),
  })),
});
