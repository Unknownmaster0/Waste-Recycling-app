import { Router } from "express";
const router = Router();

router.route('/progress').get(learningProgress);
router.route('/resources').get(learningResources);

export default router;