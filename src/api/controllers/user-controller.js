import bcrypt from 'bcrypt';
import { listAllUsers, findUserById, addUser } from '../models/user-model.js';

// GET kaikki käyttäjät
const getUser = (req, res) => {
  res.json(listAllUsers());
};

// GET käyttäjä id:llä
const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

// POST uusi käyttäjä
const postUser = async (req, res) => {
   try{
      // Hashataan salasana
      req.body.password = bcrypt.hash(req.body.password, 10);

      const newuser = await addUser(req.body);
      res.status(201).json(newuser);
   }
   catch (error) {
      console.error(error);
      res.sendStatus(500);
   }
};

// PUT (hard coded)
const putUser = (req, res) => {
  res.json({ message: 'User item updated.' });
};

// DELETE (hard coded)
const deleteUser = (req, res) => {
  res.json({ message: 'User item deleted.' });
};

export { getUser, getUserById, postUser, putUser, deleteUser };
