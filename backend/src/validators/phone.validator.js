import { z } from 'zod';

export const phoneValidator = z
  .string()
  .length(10, { message: 'phone number must be of length 10 characters' });
