import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/api_response.js';
import User from '../models/user.models.js';

export const authenticateUser = async function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(new ApiResponse(401, 'token is required', ''));
  }
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findOne({ _id: payload.id });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, 'User not found', ''));
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(`Error while authenticate user middleware: ${err}`);
    return res.status(400).json(new ApiResponse(400, 'User not exist!', ''));
  }
};
