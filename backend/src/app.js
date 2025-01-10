import express from 'express';
import cors from 'cors';
const app = express();

// cors policy
app.use(
  cors({
    origin: [
      'https://waste-recycling-app.vercel.app',
      'https://localhost:5173',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// important middlwares to be used to receive data from the user.
app.use(express.json({ limit: '20kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '20kb',
  })
);
app.use(express.static('public')); // to store some favicon, pdf, locally on my public folder.

// Importing the routes
import userRoute from './routes/user.routes.js';
import locationRoute from './routes/location.routes.js';
import quizRoute from './routes/quiz.routes.js';

// Using the routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/location', locationRoute);
app.use('/api/v1/quiz', quizRoute);

// import storeQuizQuestions from './quiz.data.js';
// storeQuizQuestions();  // to store the quiz questions in the db only from server side.

export default app;
