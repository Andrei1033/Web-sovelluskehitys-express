import express from 'express';
import api from '../src/api/index.js';
import catRouter from '../src/api/routers/cat-router.js';
import authRouter from '../src/api/routers/auth-router.js';
import { notFoundHandler, errorHandler} from '../src/middlewares/error-handlers.js';
import cors from 'cors';

const app = express();

// 1. CORS
app.use(cors());

// 2. JSON ja URL encoded middlewaret
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Staattiset tiedostot
app.use('/public', express.static('public'));

// 4. Test route (tämä on route, ei middleware)
app.get('/', (req, res) => {
   res.send('API running');
});

// 5. API routerit
app.use('/api/v1', api);
app.use('/api/v1/cats', catRouter);
app.use('/api/v1/auth', authRouter);

// 6. Error handlerit (viimeisenä!)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
