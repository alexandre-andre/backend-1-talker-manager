const express = require('express');
const bodyParser = require('body-parser');
const { PORT, STATUS: { HTTP_OK_STATUS } } = require('./utils');
const { talkerRoute } = require('./routes/talker');
const { loginRoute } = require('./routes/login');
// const { validateAuthorization } = require('./middlewares/auth-middleware');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use(validateAuthorization);

app.use('/talker', talkerRoute);

app.use('/login', loginRoute);

app.all('*', (err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server internal error'});
});

app.listen(PORT, () => {
  console.log('Online');
});
