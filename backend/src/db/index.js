import mongoose from 'mongoose';

const connectDb = async function () {
  try {
    console.log(`connection uri: ${process.env.MONGODB_URI}`);
    console.log(`db name: ${process.env.DB_NAME}`);
    const connectionObject = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
  } catch (err) {
    console.error('error while connection with database: ', err);
    throw err;
  }
};

export default connectDb;
