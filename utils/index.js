const fs = require('fs/promises');

const STATUS = {
  HTTP_OK_STATUS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  NOT_FOUND: 404,
};

const PORT = '3000';

const readFile = async () => { // le json
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

const writeFile = async (content) => { // escreve no json
  const jsonStringify = JSON.stringify(content, null, 2);
  await fs.writeFile('./talker.json', jsonStringify, 'utf-8');
};

const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
const DATA_REGEX = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const RULES_TALKER = {
  AUTHORIZATION_LENGTH: 16,
  MIN_LENGTH_NAME: 3,
  MIN_AGE: 18,
  MIN_RATE: 1,
  MAX_RATE: 5,
};

module.exports = {
  readFile,
  writeFile,
  STATUS,
  PORT,
  emailValidation,
  RULES_TALKER,
  DATA_REGEX,
};
