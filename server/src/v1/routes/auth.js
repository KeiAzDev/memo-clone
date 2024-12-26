import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import env from 'dotenv';
env.config();

import User from '../models/user.js';
import { validate } from '../handlers/validation.js';
import { makeKey, unKey } from '../controllers/user.js';
import { verityToken } from '../handlers/tokenHadler.js';

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

  validate,
  makeKey
  );

  //login api
router.post('/login', 
  body('username').isLength({min: 8}).withMessage('ユーザー名は8文字以上である必要があります'),
  body('password').isLength({min: 8}).withMessage('パスワードは8文字以上である必要があります'),
  validate,
  unKey
);

//JWT認証API
router.post('/verify-token', verityToken, (req, res) => {
  return res.status(200).json({user: req.user});
});

export default router;