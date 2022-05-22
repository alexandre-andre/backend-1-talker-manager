const { STATUS, RULES_TALKER } = require('../utils');

const { AUTHORIZATION_LENGTH } = RULES_TALKER;

function validateAuthorization(req, res, next) {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(STATUS.NOT_AUTHORIZED).json({ message: 'Token não encontrado' });
  }
  
  if (authorization.length !== AUTHORIZATION_LENGTH) {
    return res.status(STATUS.NOT_AUTHORIZED).json({ message: 'Token inválido' });
  }
  
  next();
}

module.exports = { validateAuthorization };