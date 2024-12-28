import { Router } from 'express';
import { checkAnswerAndUpdateScore, getQuestions, getScores } from '../controllers/quiz.controller.js';
import { questionVerificationMiddleware, userScoreMiddleware } from '../middlewares/quiz.middleware.js';
const router = Router();

router.route('/questions').get(getQuestions);
router.route('/scores').get(userScoreMiddleware, getScores);
router.route('/answer').post(questionVerificationMiddleware, userScoreMiddleware, checkAnswerAndUpdateScore);

export default router;