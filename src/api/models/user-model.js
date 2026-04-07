// mock data
const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password123',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((user) => user.user_id == id);
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[0].user_id + 1;

  const newUser = { user_id: newId, name, username, email, role, password };
  userItems.unshift(newUser);

  return { user_id: newId };
};

const findUserByUsername = async (username) => {
   const sql = `SELECT * FROM wsk_users WHERE username = ?`;
   const [rows] = await db.execute(sql, [username]);
   return rows[0];
}

export { listAllUsers, findUserById, addUser, findUserByUsername };
