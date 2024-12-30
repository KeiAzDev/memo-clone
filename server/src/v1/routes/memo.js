import { Router } from 'express';
import { create } from '../controllers/memo.js';
import { verityToken } from '../handlers/tokenHadler.js';

const router = Router();

//メモを作成
router.post('/', verityToken, create);

export default router;