const express = require('express');
const bodyParser = require('body-parser');
const { HTTP_OK_STATUS, PORT } = require('./utils');
const { talkerRoute } = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoute);

app.listen(PORT, () => {
  console.log('Online');
});
