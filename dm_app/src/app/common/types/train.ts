import {z} from 'zod';

export const TrainSchema = z.object({
  'train': z.object({
    'train_id': z.number(),
    'origin': z.number(),
    'destinaion': z.number(),
    'car': z.number(),
  }),
});