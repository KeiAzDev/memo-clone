import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import router from './src/v1/routes/index.js';
import cors from 'cors';
env.config();


const app = express();
const PORT = 8080;

app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.json());
app.use('/api/v1', router);

//DB connect
try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('DBと接続中');
} catch(err) {
  console.log(err);
}





app.listen(PORT, () => {
  console.log('サーバー起動中');
});