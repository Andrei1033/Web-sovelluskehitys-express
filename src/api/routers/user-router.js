import express from 'express';
import { getUser, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(getUser)
  .post(
    body('username').trim().isLength({ min: 3, max: 20 }).withMessage('Username must be 3-20 characters').isAlphanumeric().withMessage('Username must be alphanumeric'),
    body('email').trim().isEmail().withMessage('Must be a valid email address'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    validationErrors,
    postUser
  );

userRouter.route('/:id')
  .get(getUserById)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
