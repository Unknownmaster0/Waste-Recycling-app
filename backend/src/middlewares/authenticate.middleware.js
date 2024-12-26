import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/api_response.js';

export const authenticateUser = async function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(new ApiResponse(401, 'token is required', ''));
  }
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = payload;
    next();
  } catch (err) {
    console.log(`Error while authenticate user middleware: ${err}`);
    return res.status(400).json(new ApiResponse(400, 'User not exist!', ''));
  }
};
