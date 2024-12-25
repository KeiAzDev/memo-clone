import JWT from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import User from '../models/user.js';
import { param } from 'express-validator';

export const makeKey = async (req, res) => {
  const password = req.body.password;

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await User.create(req.body);
    //jwt
    const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '24h'});
    return res.status(200).json({user, token});
  } catch(err) {
    return res.status(500).json(err);
  }
};

//login
export const unKey = async(req, res) => {
  const {username, password} = req.body;

  try {
    //DBからユーザーが存在するか探す
    const user = await User.findOne({username: username});
    if(!user) {
      return res.status(401).json({
        errors: {
          param: 'username',
          message: 'ユーザー名が無効です'
        }
      })
    }

    //パスワードがあっているか照合する
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);

    if(decryptedPassword !== password) {
      return res.status(401).json({
        errors: {
          param: 'password',
          message: 'パスワードが無効です',
        }
      })
    }

    //JWT発行
    const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '24h'});
    return res.status(201).json({user, token});

  } catch(err) {
    return res.status(500).json(err);
  }
};