import express from 'express';
import { postLogin, getMe } from '../controllers/auth-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter.route('/login').post(
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validationErrors,
  postLogin
);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
