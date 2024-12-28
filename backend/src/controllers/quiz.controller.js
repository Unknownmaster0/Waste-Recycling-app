import Quiz from '../models/quizzes.models.js';
import ApiResponse from '../utils/api_response.js';

export const getQuestions = async (req, res) => {
  // fetch questions from the database or API
  const questions = await Quiz.find();
  // return the fetched questions as response
  return res.status(200).json(new ApiResponse(200, 'success', questions));
};

export const getScores = async (req, res) => {
  // check if the user has a valid token and does has any user with that payload.
  const user = req.user;
  // get the score of the corresponding user and return it.
  return res.status(200).json(new ApiResponse(200, 'success', user.quiz_score));
};

export const checkAnswerAndUpdateScore = async (req, res) => {

}