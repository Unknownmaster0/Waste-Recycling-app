import { Router } from 'express';
import { checkAnswerAndUpdateScore, getQuestions, getScores } from '../controllers/quiz.controller.js';
import { questionVerificationMiddleware } from '../middlewares/quiz.middleware.js';
import { authenticateUser } from '../middlewares/authenticate.middleware.js';
const router = Router();

router.route('/questions').get(authenticateUser, getQuestions);
router.route('/scores').get(authenticateUser, getScores);
router.route('/answer').post(questionVerificationMiddleware, authenticateUser, checkAnswerAndUpdateScore);

export default router;