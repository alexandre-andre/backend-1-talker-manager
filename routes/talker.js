const express = require('express');
const rescue = require('express-rescue');
const { validateAuthorization } = require('../middlewares/auth-middleware');

const {
  validateTalker,
  editTalker,
  removeTalker,
  getSearchTerm,
} = require('../middlewares/talker');

const { STATUS, readFile, writeFile } = require('../utils');

const { HTTP_OK_STATUS, CREATED, NO_CONTENT, NOT_FOUND } = STATUS;

const talkerRoute = express.Router();

talkerRoute.get('/search', validateAuthorization, rescue(async (req, res) => {
  const { q: name } = req.query;

  const talkers = await readFile();
  
  const getSearch = await getSearchTerm(talkers, name);
  
  res.status(HTTP_OK_STATUS).json(getSearch);
}));

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
  const talker = await readFile();

  const newTalker = { id: Math.max(...talker.map(({ id }) => id)) + 1, ...req.body };

  talker.push(newTalker);

  await writeFile(talker);

  res.status(CREATED).json(newTalker);
}));

talkerRoute.put('/:id', validateAuthorization, validateTalker, rescue(async (req, res) => {
  const { id } = req.params;

  const editedTalker = await editTalker(id, req.body);

  res.status(HTTP_OK_STATUS).json(editedTalker);
}));

talkerRoute.delete('/:id', validateAuthorization, rescue(async (req, res) => {
  const { id } = req.params;
  await removeTalker(id);
  res.status(NO_CONTENT).end();
}));

module.exports = {
  talkerRoute,
};
