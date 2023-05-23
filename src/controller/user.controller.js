const express = require(`express`);
const route = express.Router();
const { getAlldata, getDataById, createData, updateData, deleteData } = require(`../service/user.service`);

route.get(`/`, async (req, res) => {
  try {
    const data = await getAlldata();
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

route.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

route.post(`/`, async (req, res) => {
  try {
    const { name, surname, city, birth, age } = req.body;
    const data = await createData(name, surname, city, birth, age);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

route.put(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, city, birth, age } = req.body;
    const data = await updateData(id, name, surname, city, birth, age);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

route.delete(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteData(id);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});
// route.delete(`/:id`, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await deleteData(id);
//     res.send(data);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

module.exports = route;
