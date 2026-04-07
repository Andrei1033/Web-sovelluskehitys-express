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

// PUT
const putUser = async (req, res) => {
   try {
      const userId = parseInt(req.params.id);
      const loggedInUserId = res.locals.user.user_id;
      const isAdmin = res.locals.user.role === 'admin';

      // Tarkista oikeudet
      if (userId !== loggedInUserId && !isAdmin) {
         return res.status(403).json({ message: 'Forbidden: You can only update your own user info' });
      }

      // Jos ei admin, estä roolin muuttaminen
      if (!isAdmin && req.body.role) {
         delete req.body.role;
      }

      // Jos salasana annetaan, hashataan se
      if (req.body.password) {
         req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const result = await updateUser(userId, req.body);

      if (result) {
         res.json({ message: 'User updated successfully' });
      } else {
         res.status(404).json({ message: 'User not found' });
      }

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const loggedInUserId = res.locals.user.user_id;
    const isAdmin = res.locals.user.role === 'admin';

    // Tarkista oikeudet
    if (userId !== loggedInUserId && !isAdmin) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own user' });
    }

    const result = await deleteUserFromDb(userId);

    if (result) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };
