const express = require(`express`);
const route = express.Router();
const { getAlldata, getDataById } = require(`../service/user.service`);

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
    const {id} = req.params
    const data = await getDataById(id);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = route;
