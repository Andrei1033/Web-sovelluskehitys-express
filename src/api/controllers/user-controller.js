import bcrypt from 'bcrypt';
import { listAllUsers, findUserById, addUser } from '../models/user-model.js';

// GET kaikki käyttäjät
const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// GET käyttäjä id:llä
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// POST uusi käyttäjä
const postUser = async (req, res) => {
  try {
    // TÄRKEÄ: await bcrypt.hash
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = await addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// PUT (hard coded)
const putUser = async (req, res) => {
  try {
    // Tämä on esimerkki - toteuta updateUser modeliin
    res.json({ message: 'User item updated.' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// DELETE (hard coded)
const deleteUser = async (req, res) => {
  try {
    // Tämä on esimerkki - toteuta deleteUser modeliin
    res.json({ message: 'User item deleted.' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
export { getUser, getUserById, postUser, putUser, deleteUser };
