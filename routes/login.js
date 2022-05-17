const express = require('express');
const jwt = require('jsonwebtoken');
// const { validateLogin } = require('../middlewares/login');
const { HTTP_OK_STATUS } = require('../utils');

const loginRoute = express.Router();
const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
const SECRET = 'usertools';

function verifyEmail(req, res, next) {
  const { email } = req.body;
  
  if (!email || email === null) {
    res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!emailValidation.test(email)) {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function verifyPassword(req, res, next) {
  const { password } = req.body;
  const MIN_LENGTH_PASSWORD = 6;
  
  if (!password || password === null) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  
  if (password.length < MIN_LENGTH_PASSWORD) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

// function verifyLogin(_req, _res, next) {
//   if (verifyEmail && verifyPassword) next();
// }

loginRoute.post('/', verifyEmail, verifyPassword, (_req, res) => {
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
