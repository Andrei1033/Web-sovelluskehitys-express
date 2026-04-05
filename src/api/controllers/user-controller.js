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
const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201).json({ message: 'New user added.', result });
  } else {
    res.sendStatus(400);
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
