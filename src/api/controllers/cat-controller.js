import { listAllCats, findCatById, addCat} from "../models/cat-model.js";

const getCats = (req, res) => {
  const cats = listAllCats();
  res.json(cats);
};

const getCatById = (req, res) => {
   const cat = findCatById(parseInt(req.params.id));

   if (cat) {
      res.json(cat);
   }
   else {
      res.status(404).json({ message: "Cat not found" });
   }
};

const postCat = (req, res) => {

   console.log(req.body);
   console.log(req.file);

   const catData = {
      ...req.body,
      filename: req.file ? req.file.filename : null,
   };

   const result = addCat(catData);

   if (result.cat_id) {
      res.status(201).json({
         message: 'New cat added.',
         result,
      });
   }
   else {
      res.sendStatus(400);
   }
};

const putCat = (req, res) => {
   res.json({ message: 'Cat item updated.' });
}

const deleteCat = (req, res) => {
   res.json({ message: 'Cat item deleted.' });
}

export { getCats, getCatById, postCat, putCat, deleteCat };
