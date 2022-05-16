const fs = require('fs/promises');

const readFile = async () => { // le json
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

const writeFile = async (content) => { // escreve no json
  const jsonStringify = JSON.stringify(content, null, 2);
  await fs.writeFile('./talker.json', jsonStringify, 'utf-8');
};

module.exports = {
  readFile,
  writeFile,
};
