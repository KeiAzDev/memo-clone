import { Router } from 'express';
import { create, getAllMemo, getOne, update } from '../controllers/memo.js';
import { verifyToken } from '../handlers/tokenHandler.js';

const router = Router();

//メモを作成
router.post('/', verifyToken, create);

//ログインしているユーザーが投稿したメモを全て取得
router.get('/', verifyToken, getAllMemo);

//ログインしているユーザーが投稿したメモを一つ取得
router.get('/:memoId', verifyToken, getOne);

//ログインしているユーザーが投稿したメモを更新
router.put('/:memoId', verifyToken, update);

export default router;