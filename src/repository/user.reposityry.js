const { pool } = require(`../db`);

async function getAlldataDb() {
  const client = await pool.connect();
  const sql = 'SELECT users.id, users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id ';
  const result = (await client.query(sql)).rows;
  return result;
}

async function getDataByIdDb(id) {
  const client = await pool.connect();
  const sql =
    'SELECT users.id, users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id where users.id = $1';
  // const sql = 'SELECT * FROM users_info where id = $1';
  const result = (await client.query(sql, [id])).rows;
  return result;
}

async function createDataDb(name, surname, city, birth, age) {
  console.log(name, surname, city, birth, age);
  const client = await pool.connect();
  const sql = `insert into users_info (city, birth, age) values($1, $2, $3) returning *`;
  const result = (await client.query(sql, [city, birth, age])).rows;
  const sql_2 = `insert into users (name, surname, info_id) values($1, $2, $3) returning *`;
  const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;
  return [{ ...result[0], ...result_2[0] }];
}

async function updateDataDb(id, name, surname, city, birth, age) {
  const client = await pool.connect();
  const sql = `update users_info set birth = $1, city = $2, age = $3 where id = $4 returning *`;
  const result = (await client.query(sql, [birth, city, age, id])).rows;
  const sql_2 = `update users set name = $1, surname = $2 where info_id = $3 returning *`;
  const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;
  return [{ ...result[0], ...result_2[0] }];
}

async function deleteDataDb(id) {
  const client = await pool.connect();
  const sql = `delete from users_info where id = $1 returning *`;
  const result = (await client.query(sql, [id])).rows;
  const sql_2 = `delete from users where info_id = $1 returning *`;
  const result_2 = (await client.query(sql_2, [id])).rows;
  return [{ ...result[0], ...result_2[0] }];
}
module.exports = { getAlldataDb, getDataByIdDb, createDataDb, updateDataDb, deleteDataDb };
