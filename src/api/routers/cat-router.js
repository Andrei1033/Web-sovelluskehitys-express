import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/upload.js';
import {getCats, getCatById, postCat, deleteCat, getCatsByUser, updateCat} from '../controllers/cat-controller.js';

const catRouter = express.Router();

const upload = multer({
   dest: 'uploads/',
});

catRouter.route('/')
   .get(getCats)
   .post(upload.single('cat'),
      createThumbnail,
      postCat
   );

catRouter.get('/user/:id', getCatsByUser);

catRouter.route('/:id')
   .get(getCatById)
   .put(updateCat)
   .delete(deleteCat);

export default catRouter;
