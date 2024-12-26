import User from '../models/user.models.js';

export const userExist = async function (email, signUp = true) {
  try {
    const user = await User.findOne({
      $and: [{ email: email }, { signUp: signUp }],
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(
      `error while finding user in database in userExist method: ${error}`
    );
    return null;
  }
};
