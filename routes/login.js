const express = require('express');
const jwt = require('jsonwebtoken');
// const { validateLogin } = require('../middlewares/login');
const { HTTP_OK_STATUS } = require('../utils');

const loginRoute = express.Router();
const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
const SECRET = 'usertools';

function verifyLogin(req, res, next) {
  const { email, password } = req.body;
  const response = res.status(401).json({ message: 'Email ou senha inválido' });
  if (!emailValidation.test(email) || email === null) {
    return response;
  }
  if (!password || password === null) {
    return response;
  }
  next();
}

loginRoute.post('/', verifyLogin, (_req, res) => {
  const token = jwt.sign({ userId: 1 }, SECRET);
  const tokenSliced = token.slice(0, 16);
  const last = Math.floor(Math.random() * 9);

  return res.status(HTTP_OK_STATUS).json({
    token: tokenSliced.replace(tokenSliced[15], last),
  });

  // const tokenSliced = token.slice(token.length - 16, token.length);
  // return res.status(HTTP_OK_STATUS).json({ token: tokenSliced });
});

module.exports = { loginRoute };
