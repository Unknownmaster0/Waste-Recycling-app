import { Router } from 'express';
import {
  loginUserPass,
  loginSendOtp,
  otpValidator,
  signupSendOtp,
} from '../controllers/user.controller.js';
import { signupValidator } from '../middlewares/singup.middleware.js';
import { loginWithoutOTP } from '../middlewares/login.middleware.js';
const router = Router();

router.route('/login-pass').post(loginWithoutOTP, loginUserPass);
router.route('/login/send-otp').post(loginSendOtp);
router.route('/login/verify-otp').get(otpValidator);
router.route('/signup/send-otp').post(signupValidator, signupSendOtp);
router.route('/signup/verify-otp').get(otpValidator);

export default router;