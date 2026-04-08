import { listAllCats, findCatById, addCat, getCatsByUserId, deleteCatById, updateCatById} from "../models/cat-model.js";

const catListGet = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error('Error fetching cats:', error);
    next(error);
  }
}

const getCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error('Error fetching cats:', error);
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
};

const postCat = async (req, res, next) => {

  if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      return next(error);
  }

  const catData = {
    ...req.body,
    filename: req.file.filename
  };

  const result = await addCat(catData);

  res.status(201).json({
    message: 'New cat added',
    result,
  });
};

const updateCat = async (req, res, next) => {
  const id = req.params.id;
  const catData = req.body;

  try {
    // Hae kissa tietokannasta
    const existingCat = await findCatById(id);

    if (!existingCat) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }

    // Tarkista omistajuus
    const loggedInUserId = req.user.user_id;
    const isAdmin = req.user.role === 'admin';
    const isOwner = existingCat.owner === loggedInUserId;

    if (!isOwner && !isAdmin) {
      const error = new Error('Forbidden: You can only update your own cats');
      error.status = 403;
      return next(error);
    }

    // Jos ei admin, estä owner kentän muuttaminen toisen omistajaksi
    if (!isAdmin && catData.owner && catData.owner !== loggedInUserId) {
      const error = new Error('Forbidden: You cannot transfer ownership');
      error.status = 403;
      return next(error);
    }

    const result = await updateCatById(catData, id);
    res.json({ message: 'Cat updated successfully', result });

  } catch (error) {
    console.error(error);
    next(error);  // heitetään errorHandlerille (status 500)
  }
};

const deleteCat = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Hae kissa tietokannasta
    const existingCat = await findCatById(id);

    if (!existingCat) {
      const error = new Error('Cat not found');
      error.status = 404;
      return next(error);
    }

    // Tarkista omistajuus
    const loggedInUserId = req.user.user_id;
    const isAdmin = req.user.role === 'admin';
    const isOwner = existingCat.owner === loggedInUserId;

    if (!isOwner && !isAdmin) {
      const error = new Error('Forbidden: You can only delete your own cats');
      error.status = 403;
      return next(error);
    }

    const result = await deleteCatById(id);
    res.json({ message: 'Cat deleted successfully', result });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCatsByUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const cats = await getCatsByUserId(userId);
    res.json(cats);
  } catch (error) {
    console.error('Error fetching cats for user:', error);
    next(error);
  }
}

export { getCats, getCatById, postCat, deleteCat, catListGet, getCatsByUser, updateCat};
