import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
   console.log('authenticateToken', req.headers);

   // Token odotetaan Authorization-headerissa muodossa "Bearer <token>"
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // ota token

   console.log('token', token);

   if (!token) {
      return res.status(401).json({ message: 'Token missing' }); // token puuttuu
   }

   try {
      // Tarkistetaan tokenin oikeellisuus
      res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
      next(); // token ok, siirrytään seuraavaan middlewareen tai controlleriin
   }
   catch (error) {
      console.error('Token verification error:', error);
      res.status(403).json({ message: 'Invalid token' }); // token ei kelpaa
   }
};

export { authenticateToken };
