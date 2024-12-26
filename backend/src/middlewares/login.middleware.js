import ApiResponse from '../utils/api_response.js';
import { passwordValidator } from '../validators/password.validator.js';
import { emailValidator } from '../validators/email.validator.js';

export const emailPasswordValidator = function (email, password) {
  const checkmail = emailValidator.safeParse(email);
  if (!checkmail.success) {
    return false;
  }

  const checkPassword = passwordValidator.safeParse(password);
  if (!checkPassword.success) {
    return false;
  }

  return true;
};

export const loginWithoutOTP = async function (req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json(new ApiResponse(401, 'email or password are required', ''));
  }

  // after correct validation of the email and password
  next();
};
