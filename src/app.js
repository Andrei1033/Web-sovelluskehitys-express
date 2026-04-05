import express from 'express';
import api from './api/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get('/', (req, res) => {
   res.send('Hello everyone!');
});

// static files
app.use('/public', express.static('public'));

app.use('/api/v1', api);

// API
app.get('/api/v1/cat', (req, res) => {
   const cat = {
      cat_id: 1,
      name: "Misu",
      birthdate: "2020-01-01",
      weight: 4.5,
      owner: "Matti",
      image: "https://loremflickr.com/320/240/cat"
   };

   res.json(cat);
});

export default app;
