const { getAlldataDb, getDataByIdDb, createDataDb, updateDataDb, deleteDataDb } = require(`../repository/user.reposityry`);

async function getAlldata() {
  const data = await getAlldataDb();
  if (!data.length) throw new Error(`бд не заполнена`);
  return data;
}

async function getDataById(id) {
  const data = await getDataByIdDb(id);
  if (id <= 0) throw new Error(`id  должен быть больше нуля `);
  return data;
}

async function createData(name, surname, city, birth, age) {
  const data = await createDataDb(name, surname, city, birth, age);
  if (data.length == 0) throw new Error(`бд не заполнена`);
  return data;
}

async function updateData(id, name, surname, city, birth, age) {
  const data = await updateDataDb(id, name, surname, city, birth, age);
  if (!data.length) throw new Error(`бд не заполнена`);
  return data;
}

async function deleteData(id) {
  const data = await deleteDataDb(id);
  if (!data.length) throw new Error(`бд не заполнена`);
  return data;
}

module.exports = { getAlldata, getDataById, createData, updateData, deleteData };
