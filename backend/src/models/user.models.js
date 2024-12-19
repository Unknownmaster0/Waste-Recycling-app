import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    quiz_score: {
      type: String,
      default: '0',
    },
    learning_percentage: {
      type: String,
      default: '0',
    },
    otp: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// adding the pre method for hashing the password before saving in db.
userSchema.pre('save', async function (next) {
  // don't do always else only for particular time when password is changed.
  if (!this.isModified('password')) return next();
  // when password changed
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(
      `this error while hashing the password through bcrypt: ${error.message}`
    );
  }
});

// adding custom method for the validation of the password.
userSchema.methods.validatePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(
      `this error while validating the password through bcrypt: ${error.message}`
    );
  }
};

const User = mongoose.model('User', userSchema);
export default User;
