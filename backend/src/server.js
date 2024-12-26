import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDb from './db/index.js';

const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) =>
    console.log(`error in server.js while connnecting with db ${err}`)
  );
