import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken headers:', req.headers);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('token:', token);

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'invalid token' });
  }
};

export { authenticateToken };
