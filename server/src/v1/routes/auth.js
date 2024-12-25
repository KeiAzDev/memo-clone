import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import env from 'dotenv';
env.config();

import User from '../models/user.js';
import { validate } from '../handlers/validation.js';
import { register } from '../controllers/user.js';

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
  register
  )



export default router;