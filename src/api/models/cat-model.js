import promisePool from "../../utils/database.js";

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    `SELECT wsk_cats. * , wsk_users.username AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id`
  );
  return rows;
};

const findCatById = async (id) => {
  const [rows] =
    await promisePool.execute(
      `SELECT * FROM wsk_cats WHERE cat_id = ?`,
      [id]
    );

  if (rows.length === 0) return false;
  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const sql = `
    INSERT INTO wsk_cats
    (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] =
    await promisePool.execute(sql, [
      cat_name,
      weight,
      owner,
      filename,
      birthdate,
    ]);

  return { cat_id: result.insertId };
};

const getCatsByUserId = async (userId) => {
   const [rows] = await promisePool.execute(
      `
         SELECT
            wsk_cats.*,
            wsk_users.username AS owner_name
         FROM wsk_cats
         JOIN wsk_users
            ON wsk_cats.owner = wsk_users.user_id
         WHERE owner = ?
      `,
      [userId]
   );
   return rows;
};

const updateCatById = async (cat, id) => {
  const sql = `
    UPDATE wsk_cats
    SET
      cat_name = ?,
      weight = ?,
      owner = ?,
      filename = ?,
      birthdate = ?
    WHERE cat_id = ?
  `;

  const params = [
    cat.cat_name || null,
    cat.weight || null,
    cat.owner || null,
    cat.filename || null,
    cat.birthdate || null,
    id,
  ];

  try {
    const [result] = await promisePool.execute(sql, params);
    return result;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const deleteCatById = async (id) => {
   const [result] = await promisePool.execute(
      `DELETE FROM wsk_cats WHERE cat_id = ?`,
      [id]
   );
   if (result.affectedRows === 0) {
      return { message: 'Cat not found.' };
   }
   return { message: 'Cat item deleted.' };
};


export { listAllCats, findCatById, addCat, getCatsByUserId, deleteCatById, updateCatById};
