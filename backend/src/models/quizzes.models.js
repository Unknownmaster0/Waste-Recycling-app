import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    options: {
      type: [String],
      required: true,
      valdiate: {
        validator: function (value) {
          return value.length >= 2; // at least 2 options will be required.
        },
      },
    },
    correct_answer: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0 && value <= this.options.length; // the idx of the correct_answer must be within bound.
        },
      },
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
