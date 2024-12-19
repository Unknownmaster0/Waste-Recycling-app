import { Router } from 'express';
import { loginUser, nearLocation, signupUser } from '../controllers/user.controller';
const router = Router();

router.route('/login').post(loginUser);
router.route('/signup').post(signupUser);
router.route('/nearLocation').get(nearLocation);

export default router;