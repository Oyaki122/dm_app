import {z} from 'zod';

export const UserSchema = z.object({
  'user': z.string(),
});