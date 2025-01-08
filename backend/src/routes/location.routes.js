import { Router } from 'express';
import {
  calcDistMiddleware,
  getRouteMiddleware,
  validateCalcdist,
  verifyNearbyInput,
} from '../middlewares/location.middlewares.js';

import {
  getDistAndRoute,
  nearbyLocation,
} from '../controllers/location.controller.js';
// ======================= Above is only import statemnet. =======================

const router = Router();

router.route('/get-nearby-center').get(verifyNearbyInput, nearbyLocation);
router
  .route('/get-direction')
  .post(
    validateCalcdist,
    calcDistMiddleware,
    getRouteMiddleware,
    getDistAndRoute
  );

export default router;
