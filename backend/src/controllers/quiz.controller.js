import Quiz from '../models/quizzes.models.js';
import User from '../models/user.models.js';
import ApiResponse from '../utils/api_response.js';

export const getQuestions = async (req, res) => {
  // fetch questions from the database or API
  try {
    const questions = await Quiz.find();
    const updatedQuestions = questions.map((question) => ({
      id: question._id,
      question: question.question,
      options: question.options,
    }));
    // return the fetched questions as response
    return res
      .status(200)
      .json(new ApiResponse(200, 'success', updatedQuestions));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, 'error while getting questions from database', '')
      );
  }
};

export const getScores = async (req, res) => {
  // check if the user has a valid token and does has any user with that payload.
  const user = req.user;
  // get the score of the corresponding user and return it.
  return res.status(200).json(new ApiResponse(200, 'success', user.quiz_score));
};

export const checkAnswerAndUpdateScore = async (req, res) => {
  const user = req.user;
  const quizQuestion = req.question;
  const { answer } = req.body;
  if (parseInt(answer) === quizQuestion.correct_answer) {
    // THEN NEED TO UPDATE THE SCORE OF THE CURRENT USER AND SEND MESSAGE THAT YOUR CHOICE IS CORRECT.
    try {
      await User.updateOne({ _id: user._id }, { $inc: { quiz_score: 1 } });
      return res.status(200).json(
        new ApiResponse(200, 'CORRECT ANSWER', {
          // score: user.quiz_score,
          correct_option: quizQuestion.correct_answer,
        })
      );
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            'ERROR WHILE UPDATING SCORE TO THE DATABASE, BUT YOUR OPTION IS CORRECT',
            ''
          )
        );
    }
  } else {
    // NO NEED TO UPDATE THE SCORE OF THE CURRENT USER AND SEND MESSAGE THAT YOUR CHOICE IS NOT CORRECT.
    return res.status(200).json(
      new ApiResponse(200, 'WRONG ANSWER', {
        // score: user.quiz_score,
        correct_option: quizQuestion.correct_answer,
      })
    );
  }
};
