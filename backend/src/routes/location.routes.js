import { Router } from "express";
import { verifyNearbyInput } from "../middlewares/location.middlewares.js";
import { nearbyLocation } from "../controllers/location.controller.js";
const router = Router();

router.route('/get-nearby-center').get(verifyNearbyInput, nearbyLocation);
router.route('/get-direction').get();

export default router;