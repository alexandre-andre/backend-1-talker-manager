const { emailValidation } = require('../utils');

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

module.exports = {
  verifyEmail,
  verifyPassword,
};
