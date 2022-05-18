const express = require('express');
const bodyParser = require('body-parser');
const { HTTP_OK_STATUS, PORT } = require('./utils');
const { talkerRoute } = require('./routes/talker');
const { loginRoute } = require('./routes/login');
// const { validateAuthorization } = require('./middlewares/auth-middleware');

const app = express();
app.use(bodyParser.json());

// app.use((req, _res, next) => {
//   console.log('------------------------------------------------------------------');
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   console.log('req.authorization:', req.authorization);
//   console.log('------------------------------------------------------------------');
//   next();
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use(validateAuthorization);

app.use('/talker', talkerRoute);

app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});
