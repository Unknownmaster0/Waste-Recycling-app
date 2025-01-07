import ApiResponse from '../utils/api_response.js';
import User from '../models/user.models.js';
import { userExist } from '../utils/userExist.js';
import generateOTP from '../utils/generate-otp.js';
import { sendEmailOtp } from '../utils/sendEmailOtp.js';
import { emailValidator } from '../validators/email.validator.js';
import { otpValidate } from '../validators/otp.validatore.js';

export const loginUserPass = async function (req, res) {
  const { email, password } = req.body;
  // check if particular email exist in the database or not.
  const user = await userExist(email);
  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'no such user exist with this email', ''));
  }

  const validatePass = await user.validatePassword(password);
  if (!validatePass) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'password is incorrect', ''));
  }

  const token = user.generateToken();
  return res.status(200).json(new ApiResponse(200, 'user logged in', token));
};

export const loginSendOtp = async function (req, res) {
  const { email } = req.query;
  if (!email) {
    return res
      .status(401)
      .json(new ApiResponse(401, 'Email is not provided', ''));
  }
  const checkmail = emailValidator.safeParse(email);
  if (!checkmail.success) {
    return res
      .status(402)
      .json(
        new ApiResponse(
          401,
          'Email is not in correct format',
          checkmail.error.issues
        )
      );
  }

  try {
    const user = await userExist(email);
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, 'No such user exist with this email', ''));
    }

    const otp = generateOTP();
    user.otp = otp;
    try {
      await user.save();
      await sendEmailOtp({
        to: email,
        message: `<h3>Your OTP is <strong>${otp}</strong></h3>`,
      });
      return res
        .status(200)
        .json(new ApiResponse(200, 'otp is send to user email', ''));
    } catch (error) {
      console.log(`error while saving otp to the user: ${error.message}`);
      return res.status(502).json(new ApiResponse(502, 'Database error', ''));
    }
  } catch (error) {
    console.log(`error while getting user from the database ${error.message}`);
    return res
      .status(502)
      .json(new ApiResponse(502, 'Error while getting user from database', ''));
  }
};

export const signupSendOtp = async function (req, res) {
  const { email } = req.query;
  const { username, password } = req.body;

  // create a new user for the database, and store it into the db.
  try {
    const otp = generateOTP();
    // find the user with same email, username, password and whose signup is false.
    const existedUser = await User.findOne({
      $and: [
        { $or: [{ email: email }, { user_name: username }] },
        { signUp: false },
      ],
    });
    if (!existedUser) {
      // if not user present in db, then create new user.
      await User.create({
        email,
        user_name: username,
        password,
        otp,
      });
    } else {
      // update existing user new mail, username or password whatever thing is required.
      existedUser.email = email;
      existedUser.user_name = username;
      existedUser.password = password;
      existedUser.otp = otp;
      await existedUser.save();
    }
    await sendEmailOtp({
      to: email,
      message: `<h1>Your otp for email verifcation : <strong>${otp}</strong></h1>`,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, 'otp is send to user email', ''));
  } catch (error) {
    console.log(`Error while creating user to the database: ${error}`);
    return res.status(502).json(new ApiResponse(502, 'database error', ''));
  }
};

export const otpValidator = async (req, res) => {
  const { email, otp } = req.query;
  if (!email || !otp) {
    return res
      .status(401)
      .json(new ApiResponse(401, 'Email or OTP is not provided', ''));
  }

  const checkmail = emailValidator.safeParse(email);
  if (!checkmail) {
    return res
      .status(402)
      .json(
        new ApiResponse(402, 'not valid mail format', checkmail.error.issues)
      );
  }
  const checkOtp = otpValidate.safeParse(otp);
  if (!checkOtp) {
    return res
      .status(402)
      .json(
        new ApiResponse(402, 'not valid otp format', checkOtp.error.issues)
      );
  }

  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, 'No such user exist with this email', ''));
    }
    user.signUp = true;
    user.otp = '000000';
    try {
      await user.save();
      const token = user.generateToken();
      return res
        .status(200)
        .json(new ApiResponse(200, 'User is verified', token));
    } catch (error) {
      console.log(`Error while saving user to the database: ${error}`);
      return res.status(502).json(new ApiResponse(502, 'database error', ''));
    }
  } catch (error) {
    return res.status(502).json(new ApiResponse(502, 'Database error', ''));
  }
};

export const verifyUser = (req, res) => {
  const user = req.user;
  return res.status(200).json(
    new ApiResponse(200, 'found user', {
      id: user._id,
      email: user.email,
      userName: user.user_name,
    })
  );
};
