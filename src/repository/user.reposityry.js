const { pool } = require(`../db`);

async function getAlldataDb() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users_info JOIN users ON users.info_id = users_info.id ';
  const result = (await client.query(sql)).rows;
  return result;
}

async function getDataByIdDb(id) {
  const client = await pool.connect();

  const sql =
    'SELECT * FROM users_info JOIN users ON users.info_id = users_info.id where users.id = $1';
  const result = (await client.query(sql, [id])).rows;

  return result;
}

async function createDataDb(name, surname, city, birth, age) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);

    const sql = `insert into users_info (city, birth, age) values($1, $2, $3) returning *`;
    const result = (await client.query(sql, [city, birth, age])).rows;

    const sql_2 = `insert into users (name, surname, info_id) values($1, $2, $3) returning *`;
    const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;

    await client.query(`COMMIT`);

    return [{ ...result[0], ...result_2[0] }];
  } catch (error) {
    await client.query(`ROLLBACK`);

    throw new Error(error.message);
  }
}

async function updateDataDb(id, name, surname, city, birth, age) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const sql = `update users_info set birth = $1, city  = $2, age = $3 where id = $4 returning *`;
    const result = (await client.query(sql, [birth, city, age, id])).rows;
    const sql_2 = `update users set name = $1, surname = $2 where info_id = $3 returning * `;
    const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;
    await client.query(`COMMIT`);
    return [{ ...result[0], ...result_2[0] }];
  } catch (error) {
    await client.query(`ROLLBACK`);

    throw new Error(error.message);
  }
}

async function deleteDataDb(id) {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const sql = `delete from users_info where id = $1 returning *`;
    const result = (await client.query(sql, [id])).rows;
    const sql_2 = `delete from users where info_id = $1 returning *`;
    const result_2 = (await client.query(sql_2, [id])).rows;
    await client.query(`COMMIT`);
    return [{ ...result[0], ...result_2[0] }];
  } catch (error) {
    await client.query(`ROLLBACK`);

    throw new Error(error.message);
  }
}

async function patchDataDb(id, clientData) {
 console.log(id, clientData)
  const client = await pool.connect();
  try {
      await client.query('BEGIN');
      const sql_1 = 'SELECT * FROM users_info JOIN users ON users.info_id = users_info.id WHERE users.info_id =$1';
      const oldData = (await client.query(sql_1, [id])).rows;

      const newObject = { ...oldData[0], ...clientData }

      const sql_2 = 'UPDATE users_info set birth = $1, city= $2, age= $3 WHERE id = $4 RETURNING *';
      const result = (await client.query(sql_2, [newObject.birth, newObject.city, newObject.age, id])).rows;

      const sql_3 = 'UPDATE users SET name = $1, surname= $2  WHERE info_id = $3 RETURNING *';
      const result_2 = (await client.query(sql_3, [newObject.name, newObject.surname, result[0].id])).rows;

      await client.query('COMMIT');

      return { ...result[0], ...result_2[0] };

  } catch (error) {
      await client.query('ROLLBACK');

      throw new Error(error.message);
  }
}
module.exports = { getAlldataDb, getDataByIdDb, createDataDb, updateDataDb, deleteDataDb, patchDataDb };
