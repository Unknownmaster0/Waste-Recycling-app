import Quiz from '../models/quizzes.models.js';
import ApiResponse from '../utils/api_response.js';

export const questionVerificationMiddleware = async (req, res, next) => {
  const { questionId, answer } = req.body;
  if (!questionId || !answer) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'Question ID and answer are required', ''));
  }

  // check if this questionId is present or not.
  try {
    const question = await Quiz.findOne({ _id: questionId });
    if (!question) {
      return res
        .status(404)
        .json(new ApiResponse(404, 'Question not found', ''));
    }
    req.question = question;
    next();
  } catch (error) {
    console.log(
      `error while finding the question based on id in question middleware: ${error.message}`
    );
    return res
      .status(400)
      .json(new ApiResponse(400, 'Invalid question ID', ''));
  }
};
