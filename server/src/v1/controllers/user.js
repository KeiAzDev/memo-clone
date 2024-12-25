import JWT from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import User from '../models/user.js';

export const register = async (req, res) => {
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
};

//login