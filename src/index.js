import app from './app.js';

import promisePool from '../src/utils/database.js';

async function testDB() {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log(rows);
}

testDB();

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
