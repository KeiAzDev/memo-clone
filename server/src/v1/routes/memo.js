import { Router } from 'express';
import { create, getAllMemo } from '../controllers/memo.js';
import { verifyToken } from '../handlers/tokenHandler.js';

const router = Router();

//メモを作成
router.post('/', verifyToken, create);

//ログインしているユーザーが投稿したメモを全て取得
router.get('/', verifyToken, getAllMemo);

export default router;