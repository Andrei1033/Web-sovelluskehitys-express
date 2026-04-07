import express from 'express';
import api from '../src/api/index.js';
import catRouter from '../src/api/routers/cat-router.js';
import authRouter from '../src/api/routers/auth-router.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get('/', (req, res) => {
   res.send('API running');
});

// static files
app.use('/public', express.static('public'));

app.use('/api/v1', api);

// API
app.use('/api/v1/cats', catRouter);

app.use('/api/v1/auth', authRouter);

export default app;
