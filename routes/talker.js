const express = require('express');

const { HTTP_OK_STATUS, readFile } = require('../utils');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_request, response) => {
  const talker = await readFile();
  return response.status(HTTP_OK_STATUS).json(talker);
});

module.exports = {
  talkerRoute,
};
