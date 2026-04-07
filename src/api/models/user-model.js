import promisePool from '../../utils/database.js';

// Hae kaikki käyttäjät
const listAllUsers = async () => {
  const sql = 'SELECT user_id, name, username, email, role FROM wsk_users';
  const [rows] = await promisePool.execute(sql);
  return rows;
};

// Hae käyttäjä id:llä
const findUserById = async (id) => {
  const sql = 'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [id]);
  return rows[0];
};

// Hae käyttäjä käyttäjätunnuksella (sisältää salasanan - kirjautumista varten)
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM wsk_users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

// Lisää uusi käyttäjä
const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = 'INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)';
  const [result] = await promisePool.execute(sql, [name, username, email, role, password]);
  return { user_id: result.insertId };
};

// Päivitä käyttäjä
const updateUser = async (id, user) => {
  const { name, username, email, role } = user;
  const sql = 'UPDATE wsk_users SET name = ?, username = ?, email = ?, role = ? WHERE user_id = ?';
  const [result] = await promisePool.execute(sql, [name, username, email, role, id]);
  return result.affectedRows > 0;
};

// Poista käyttäjä
const deleteUser = async (id) => {
  const sql = 'DELETE FROM wsk_users WHERE user_id = ?';
  const [result] = await promisePool.execute(sql, [id]);
  return result.affectedRows > 0;
};

export { listAllUsers, findUserById, findUserByUsername, addUser, updateUser, deleteUser };
