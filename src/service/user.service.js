const { getAlldataDb } = require(`../repository/user.reposityry`);

async function getAlldata() {
  const data = await getAlldataDb();
  if (!data.length) throw new Error(`бд не заполнена`);
  return data;
}

module.exports = { getAlldata };
