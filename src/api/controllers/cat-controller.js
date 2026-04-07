import { listAllCats, findCatById, addCat, getCatsByUserId, deleteCatById, updateCatById} from "../models/cat-model.js";

const catListGet = async (req, res) => {
   try {
      const cats = await getAllCats();
      res.json(cats);
   }
   catch (error) {
      console.error('Error fetching cats:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
}

const getCats = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    return res.status(404).json({message: 'Cat not found'});
  }

  res.json(cat);
};

const postCat = async (req, res) => {

  const catData = {
    ...req.body,
    filename:
      req.file?.filename ||
      req.body.filename ||
      'default.jpg',
  };

  const result = await addCat(catData);

  res.status(201).json({
    message: 'New cat added',
    result,
  });
};

const updateCat = async (req, res) => {
  const id = req.params.id;
  const cat = req.body;

  const result = await updateCatById(cat, id);

  res.json(result);
};

const deleteCat = async (req, res) => {
  const id = req.params.id;

  const result = await deleteCatById(id);

  res.json(result);
};

const getCatsByUser = async (req, res) => {
   const cats = await getCatsByUserId(req.params.id);
   res.json(cats);
};

export { getCats, getCatById, postCat, deleteCat, catListGet, getCatsByUser, updateCat};
