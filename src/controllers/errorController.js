const AppError = require('./../utils/appError');

const sendProdResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

const sendDevResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message, error: err, stack: err.stack });
};

const handleValidationError = err => {
  const errors = Object.values(err.errors)
    .map(el => el.message)
    .join('. ');

  return new AppError(errors, 400);
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    sendDevResponse(res, err);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };
    if (error.name === 'ValidationError') error = handleValidationError(error);
    sendProdResponse(res, error);
  }
};
