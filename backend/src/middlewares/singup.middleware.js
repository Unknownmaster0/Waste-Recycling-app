import User from '../models/user.models.js';
import ApiResponse from '../utils/api_response.js';
import { emailValidator } from '../validators/email.validator.js';
import { passwordValidator } from '../validators/password.validator.js';
import { usernameValidator } from '../validators/username.validator.js';

export const signupValidator = async function (req, res, next) {
  const { email } = req.query;
  const { username, password } = req.body;
  // Check if req.body is present
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }

  // Check if required fields are provided
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const checkmail = emailValidator.safeParse(email);
  if (!checkmail.success) {
    return res.status(402).json({ message: 'eamil is not in correct format' });
  }
  const userName = usernameValidator.safeParse(username);
  if (!userName.success) {
    return res
      .status(402)
      .json({ message: 'userName is not in correct format' });
  }
  const checkPassword = passwordValidator.safeParse(password);
  if (!checkPassword.success) {
    return res
      .status(402)
      .json({ message: 'password is not in correct format' });
  }

  // check if the same username or email already exist in db or not with valid signUp user.
  try {
    const user = await User.findOne({
      $and: [
        {
          $or: [{ email: email }, { user_name: username }],
        },
        { signUp: true },
      ],
    });
    if (user) {
      return res
        .status(409)
        .json(new ApiResponse(409, 'User already exists', user));
    }
    next(); // if every thing is fine, then go for the next middleware.
  } catch (err) {
    console.log(`Error while finding user in the database: ${err}`);
    return res.status(502).json(new ApiResponse(502, 'database error', ''));
  }
};
