import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { getCats, getCatById, postCat, deleteCat, getCatsByUser, updateCat } from '../controllers/cat-controller.js';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

const upload = multer({
   dest: 'uploads/',
});

// Yhteiset validointisäännöt
const catValidationRules = [
  body('cat_name').trim().isLength({ min: 3, max: 50 }).withMessage('Cat name must be 3-50 characters'),
  body('weight').isNumeric().withMessage('Weight must be a number'),
  body('owner').isInt().withMessage('Owner must be an integer'),
  body('birthdate').isDate().withMessage('Birthdate must be a valid date')
];

catRouter.route('/')
   .get(getCats)
   .post(
     authenticateToken,
     upload.single('file'),
     catValidationRules,
     validationErrors,
     createThumbnail,
     postCat
   );

catRouter.get('/user/:id', getCatsByUser);

catRouter.route('/:id')
   .get(getCatById)
   .put(
     authenticateToken,
     catValidationRules,
     validationErrors,
     updateCat
   )
   .delete(authenticateToken, deleteCat);

export default catRouter;
