const express = require('express');

const { HTTP_OK_STATUS, STATUS_BAD_REQUEST, readFile, writeFile } = require('../utils');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_request, response) => {
  const talker = await readFile();
  return response.status(HTTP_OK_STATUS).json(talker);
});

talkerRoute.get('/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await readFile();
  const findTalker = talker.find((e) => e.id === Number(id));

  if (!findTalker) {
    return response
      .status(STATUS_BAD_REQUEST).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(HTTP_OK_STATUS).json(findTalker);
});

talkerRoute.post('/', async (request, response) => {
  const { name, age, talk } = request.body;
  const talker = await readFile();
  const newTalker = {
    id: Math.max(...talker.map(({ id }) => id)) + 1,
    name,
    age,
    talk,
  };

  talker.push(newTalker);
  
  await writeFile(talker);
  
  response.status(201).json({ message: newTalker });
});

module.exports = {
  talkerRoute,
};
