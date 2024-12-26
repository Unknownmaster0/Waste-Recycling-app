import express from 'express';
const app = express();

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

// Using the routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/location', locationRoute);

export default app;
