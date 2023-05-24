const express = require(`express`);
const route = express.Router();
const { getAlldata, getDataById, createData, updateData, deleteData, patchData} = require(`../service/user.service`);
const {buildResponse} = require(`../helper/buildResponse`)
const {isValidUserId, isValidUserBody} = require(`../helper/isValidUserId`)
route.get(`/`, async (req, res) => {
  try {
    const data = await getAlldata();
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get(`/:id`, isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post(`/`, isValidUserBody, async (req, res) => {
  try {
    const { name, surname, city, birth, age } = req.body;
    const data = await createData(name, surname, city, birth, age);
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put(`/:id`, isValidUserId, isValidUserBody, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, city, birth, age } = req.body;
    const data = await updateData(id, name, surname, city, birth, age);
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete(`/:id`, isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteData(id);
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch(`/:id`, isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const data = await patchData(id, clientData);
    res.send(data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
