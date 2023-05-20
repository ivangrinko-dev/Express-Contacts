const { getAlldataDb, getDataByIdDb } = require(`../repository/user.reposityry`);

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



module.exports = { getAlldata, getDataById };
