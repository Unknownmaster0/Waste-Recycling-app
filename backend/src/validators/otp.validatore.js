import { z } from 'zod';

export const otpValidate = z
  .string()
  .length(6, { message: 'otp must have 6 length' });
