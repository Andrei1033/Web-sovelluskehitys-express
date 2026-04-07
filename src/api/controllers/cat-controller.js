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
   const catData = req.body;

   try {
      // Hae kissa tietokannasta
      const existingCat = await findCatById(id);

      if (!existingCat) {
         return res.status(404).json({ message: 'Cat not found' });
      }

      // Tarkista omistajuus
      const loggedInUserId = res.locals.user.user_id;
      const isAdmin = res.locals.user.role === 'admin';
      const isOwner = existingCat.owner === loggedInUserId;

      if (!isOwner && !isAdmin) {
         return res.status(403).json({
         message: 'Forbidden: You can only update your own cats'
         });
      }

      // Jos ei admin, estä owner kentän muuttaminen toisen omistajaksi
      if (!isAdmin && catData.owner && catData.owner !== loggedInUserId) {
         return res.status(403).json({
         message: 'Forbidden: You cannot transfer ownership'
         });
      }

      const result = await updateCatById(catData, id);
      res.json({ message: 'Cat updated successfully', result });

   }
   catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

const deleteCat = async (req, res) => {
   const id = req.params.id;

   try {
      // Hae kissa tietokannasta
      const existingCat = await findCatById(id);

      if (!existingCat) {
         return res.status(404).json({ message: 'Cat not found' });
      }

      // Tarkista omistajuus
      const loggedInUserId = res.locals.user.user_id;
      const isAdmin = res.locals.user.role === 'admin';
      const isOwner = existingCat.owner === loggedInUserId;

      if (!isOwner && !isAdmin) {
         return res.status(403).json({
         message: 'Forbidden: You can only delete your own cats'
         });
      }

      const result = await deleteCatById(id);
      res.json({ message: 'Cat deleted successfully', result });

   }
   catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

const getCatsByUser = async (req, res) => {
   const cats = await getCatsByUserId(req.params.id);
   res.json(cats);
};

export { getCats, getCatById, postCat, deleteCat, catListGet, getCatsByUser, updateCat};
