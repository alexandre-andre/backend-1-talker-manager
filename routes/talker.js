const express = require('express');
const rescue = require('express-rescue');
const { validateAuthorization } = require('../middlewares/auth-middleware');
const { validateTalker, findTalker, editTalker } = require('../middlewares/talker');
const { STATUS, readFile, writeFile } = require('../utils');

const { HTTP_OK_STATUS, CREATED, NOT_FOUND } = STATUS;

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  const talker = await readFile();
  res.status(HTTP_OK_STATUS).json(talker);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const findTalker = talker.find((e) => e.id === Number(id));

  if (!findTalker) {
    return res
      .status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(findTalker);
});

talkerRoute.post('/', validateAuthorization, validateTalker, rescue(async (req, res) => {
  const body = req.body;
  const talker = await readFile();

  const newTalker = {
    id: Math.max(...talker.map(({ id }) => id)) + 1,
    ...body
  };

  talker.push(newTalker);

  await writeFile(talker);

  res.status(CREATED).json(newTalker);
}));

talkerRoute.put('/:id', validateAuthorization, validateTalker, rescue(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const editedTalker = await editTalker(id, body)

  res.status(HTTP_OK_STATUS).json(editedTalker);
}));

module.exports = {
  talkerRoute,
};
