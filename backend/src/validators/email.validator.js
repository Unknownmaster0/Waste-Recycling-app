import { z } from 'zod';

export const emailValidator = z
  .string()
  .email({ message: 'not correct mail format' });
