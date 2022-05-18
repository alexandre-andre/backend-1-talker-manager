const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyEmail, verifyPassword } = require('../middlewares/login');
const { STATUS: { HTTP_OK_STATUS } } = require('../utils');

const loginRoute = express.Router();
const SECRET = 'usertools';

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
