import { Router } from "express";
import authRoutes from './auth.js';
import memoRoutes from './memo.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/memo', memoRoutes);

export default router;