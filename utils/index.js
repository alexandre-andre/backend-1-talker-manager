const fs = require('fs/promises');

const HTTP_OK_STATUS = 200;
const STATUS_BAD_REQUEST = 404;

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

module.exports = {
  readFile,
  writeFile,
  HTTP_OK_STATUS,
  STATUS_BAD_REQUEST,
  PORT,
  emailValidation,
};
