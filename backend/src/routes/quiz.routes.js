import { Router } from "express";
const router = Router();

router.route('/questions').get(getQuestions);
router.route('/scores').get(getScores);

export default router;