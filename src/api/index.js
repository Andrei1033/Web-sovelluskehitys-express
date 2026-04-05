import catRouter from './routers/cat-router.js';
import userRouter from './routers/user-router.js';
import express from 'express';

const router = express.Router();
router.use('/cats', catRouter);
router.use('/users', userRouter);
export default router;
