const { STATUS, RULES_TALKER, DATA_REGEX, readFile, writeFile } = require('../utils');

const { BAD_REQUEST } = STATUS;

const { MIN_LENGTH_NAME, MIN_AGE, MIN_RATE, MAX_RATE } = RULES_TALKER;

function validateName(name, res) {
  if (!name || name === null) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < MIN_LENGTH_NAME) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function validateAge(age, res) {
  if (!age || age === null) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < MIN_AGE) {
    return res.status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function validateTalk(talk, watchedAt, rate, res) {
  if (!talk || !watchedAt || !rate) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
}

function validateTalkFieldWatchedAt(watchedAt, res) {
  if (!DATA_REGEX.test(watchedAt)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateTalkFieldRate(rate, res) {
  if (rate < MIN_RATE || rate > MAX_RATE) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validateTalker(req, res, next) {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk || {};

  validateName(name, res);
  validateAge(age, res);
  validateTalk(talk, watchedAt, rate, res);
  validateTalkFieldRate(rate, res);
  validateTalkFieldWatchedAt(watchedAt, res);

  next();
}

function findTalker(talkers, id, body) {
  const findedTalker = talkers.find((t) => t.id === Number(id));
  
  if (!findedTalker) return res.status(NOT_FOUND).json({ message: 'Não encontrado' });
  
  talkers[findedTalker] = {
    ...talkers[findedTalker],
    ...body,
    id: Number(id),
  };
  
  const editedTalker = talkers[findedTalker];
  return editedTalker;
}

async function editTalker(id, body){
  const talker = await readFile();

  const editedTalker = findTalker(talker, id, body);

  await writeFile([...talker, editedTalker]);
  return editedTalker;
}

module.exports = {
  validateTalker,
  editTalker,
};
