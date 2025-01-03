import { Router } from 'express';
import { checkAnswerAndUpdateScore, getQuestions, getScores } from '../controllers/quiz.controller.js';
import { questionVerificationMiddleware, userScoreMiddleware } from '../middlewares/quiz.middleware.js';
import { authenticateUser } from '../middlewares/authenticate.middleware.js';
const router = Router();

router.route('/questions').get(getQuestions);
router.route('/scores').get(authenticateUser, getScores);
// router.route('/scores').get(userScoreMiddleware, getScores);
// router.route('/answer').post(questionVerificationMiddleware, userScoreMiddleware, checkAnswerAndUpdateScore);
router.route('/answer').post(questionVerificationMiddleware, authenticateUser, checkAnswerAndUpdateScore);

export default router;