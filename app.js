import express from 'express';

const app = express();
const PORT = 3000;

// test route
app.get('/', (req, res) => {
  res.send('Hello everyone!');
});

// static files
app.use('/public', express.static('public'));

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});