import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);

  // Tarkista että käyttäjätunnus ja salasana on annettu
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Username and password required' });
    return;
  }

  const user = await findUserByUsername(req.body.username);

  // Tarkista löytyykö käyttäjä
  if (!user) {
    console.log('Käyttäjää ei löydy:', req.body.username);
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  // Vertaa salasanaa (bcrypt.compare on asynkroninen)
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    console.log('Väärä salasana käyttäjälle:', req.body.username);
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  // Poista salasana ennen kuin lähetetään clientille
  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  // Luo JWT token
  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({ user: userWithNoPassword, token });
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({ message: 'token ok', user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
};

export { postLogin, getMe };
