import { z } from 'zod';

export const passwordValidator = z
  .string()
  .min(8, { message: 'password must be at least 8 characters' })
  .regex(/[A-Z]/, {
    message: 'password must contain at least one upper case letter',
  })
  .regex(/[a-z]/, {
    message: 'password must contain at least one lower case letter',
  })
  .regex(/\d/, { message: 'password must contain at least one number' })
  .regex(/[@#$_\-]/, {
    message: 'password must contain at least one special character',
  });
