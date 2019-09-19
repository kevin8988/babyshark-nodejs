const AppError = require('./../utils/appError');

const uniqueEmailErrorDB = err => {
  return new AppError(err.errors[0].message, 400);
};

const fieldsValidationDB = err => {
  const errors = err.errors.map(el => el.message);
  return new AppError(errors.join(' '), 400);
};

const handleConstraintError = () => new AppError('Informe um cor, gênero e categorias válidas!', 400);

const handleJWTError = () => new AppError('Token inválido. Por favor, realize o log in novamente!', 401);

const handleJWTExpiredError = () => new AppError('Seu token expirou! Por favor, realize o log in novamente!', 401);

const sendProductionResponse = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: 'error', message: 'Algo deu errado!' });
  }
};

const sendDevResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.statusCode, err, stack: err.stack });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV.trim() === 'production') {
    if (err.name === 'SequelizeUniqueConstraintError') err = uniqueEmailErrorDB(err);
    if (err.name === 'SequelizeValidationError') err = fieldsValidationDB(err);
    if (err.name === 'SequelizeForeignKeyConstraintError') err = handleConstraintError();
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendProductionResponse(res, err);
  } else {
    sendDevResponse(res, err);
  }
};
