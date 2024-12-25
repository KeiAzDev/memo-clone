import express from 'express';
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';
import { body } from 'express-validator';
import User from './src/v1/models/user.js';
import env from 'dotenv';
env.config();


const app = express();
const PORT = 8080;

app.use(express.json());

//DB connect
try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('DBと接続中');
} catch(err) {
  console.log(err);
}

//register
app.post('/register', async (req, res) => {
  const password = req.body.password;

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    //ユーザーの新規作成
    const user = await User.create(req.body);
    //jwt
    const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '24h'});
    return res.status(200).json({user, token});
  } catch(err) {
    return res.status(500).json(err);
  }
})

//login



app.listen(PORT, () => {
  console.log('サーバー起動中');
});