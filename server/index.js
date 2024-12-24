import express from 'express';
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import User from './src/v1/models/user.js';
import env from 'dotenv';
env.config();


const app = express();
const PORT = 8080;

//DB connect
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('DBと接続中');
} catch(err) {
  console.log(err);
}

//register
app.post('/register', async (req, res) => {
  const password = req.body.password;

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await new User.create(req.body);
    //jwt

  } catch {

  }
})

//login



app.listen(PORT, () => {
  console.log('サーバー起動中');
});