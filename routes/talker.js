const express = require('express');
const rescue = require('express-rescue');
const { validateAuthorization } = require('../middlewares/auth-middleware');
const { validateTalker } = require('../middlewares/talker');
const { STATUS, readFile, writeFile } = require('../utils');

const { HTTP_OK_STATUS, CREATED, NOT_FOUND } = STATUS;

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
  const talker = await readFile();
  return res.status(HTTP_OK_STATUS).json(talker);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const findTalker = talker.find((e) => e.id === Number(id));

  if (!findTalker) {
    return res
      .status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(findTalker);
});

talkerRoute.post('/', validateAuthorization, validateTalker, rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readFile();

  const newTalker = {
    id: Math.max(...talker.map(({ id }) => id)) + 1,
    name,
    age,
    talk,
  };

  talker.push(newTalker);

  await writeFile(talker);

  return res.status(CREATED).json(newTalker);
}));

module.exports = {
  talkerRoute,
};
