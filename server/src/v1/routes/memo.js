import { Router } from 'express';
import { create } from '../controllers/memo.js';
import { verifyToken } from '../handlers/tokenHandler.js';

const router = Router();

//メモを作成
router.post('/', verifyToken, create);

export default router;