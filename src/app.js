import express from 'express';
import api from './api/index.js';
import catRouter from './api/routers/cat-router.js';

const app = express();

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

export default app;
