import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
import JWT from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import env from 'dotenv';
env.config();

const router = Router();


//register
router.post('/register', 
  body('username').isLength({min: 8})
  .withMessage('ユーザー名は8文字以上である必要があります'), 
  body('password').isLength({min: 8})
  .withMessage('パスワードは8文字以上である必要があります'),
  body('confirmPassword').isLength({min: 8})
  .withMessage('確認用パスワードは8文字以上である必要があります'),
  body('username').custom((value) => {
    return User.findOne({username: value}).then((user) => {
      if(user) {
        return Promise.reject('このユーザー名はすでに使われています');
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
  async (req, res) => {
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

export default router;