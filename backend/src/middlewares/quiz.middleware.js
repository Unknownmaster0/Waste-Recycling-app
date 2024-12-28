import User from '../models/user.models.js';
import ApiResponse from '../utils/api_response.js';
import jwt from 'jsonwebtoken';

export const userScoreMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(new ApiResponse(401, 'Token is required', ''));
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    // then get the user of the (user id = payload._id)
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, 'User not found', ''));
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new ApiResponse(401, 'Invalid token', ''));
  }
};

export const questionVerificationMiddleware = async (req, res, next) => {
  const { questionId, answer } = req.body;
  if (!questionId || !answer) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'Question ID and answer are required', ''));
  }

  // check if this questionId is present or not.
  try {
    const question = await Quiz.findById(questionId);
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
