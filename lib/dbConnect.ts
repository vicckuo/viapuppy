import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(uri);
    // console.log(connection);
  } catch (error) {
    console.log('資料庫連線失敗', error);
  }
};

export default dbConnect;
