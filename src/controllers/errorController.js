const AppError = require('./../utils/appError');

const sendProdResponse = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
    console.log(err);
    res.status(err.statusCode).json({ status: err.status, message: 'Somenthing went wrong' });
  }
};

const sendDevResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message, error: err, stack: err.stack });
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors)
    .map(el => el.message)
    .join('. ');

  return new AppError(errors, 400);
};

const handleCastErrorDB = err => {
  return new AppError(`Invalid ID ${err.value}`, 400);
};

const handleDuplicateErrorDB = err => {
  const field = err.errmsg.split(':');
  return new AppError(`Duplicate field ${field[2]}`, 400);
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendDevResponse(res, err);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateErrorDB(err);
    sendProdResponse(res, err);
  }
};
