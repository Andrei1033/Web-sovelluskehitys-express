import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
   try {
      console.log('postLogin', req.body);

      // Hae käyttäjä tietokannasta käyttäjätunnuksen perusteella
      const user = await findUserByUsername(req.body.username);

      if (!user) {
         return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Tarkista salasana
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
         return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Poistetaan salasana objektista ennen tokenin luomista
      const userWithoutPassword = {
         user_id: user.user_id,
         name: user.name,
         username: user.username,
         email: user.email,
         role: user.role,
      };

      // Luo JWT
      const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
         expiresIn: '24h' // tokenin voimassaoloaika
      });

      res.json({ user: userWithoutPassword, token });
   }
   catch (error) {
      console.error(error);
      res.sendStatus(500);
   }
};

export { postLogin };
