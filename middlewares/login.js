// const emailValidator = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

// const validateLogin = (req, res, next) => {
//   const { email, password } = req.headers;
//   const response = res.status(400).json({ message: 'Email ou senha inválido' });

//   if (!emailValidator.test(email) || email === null) {
//     return response;
//   }
//   if (!password || password === null) {
//     return response;
//   }
//   next();
// };

// module.exports = { validateLogin };