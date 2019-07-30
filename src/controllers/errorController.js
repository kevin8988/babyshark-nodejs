const sendProdResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

const sendDevResponse = (res, err) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message, error: err, stack: err.stack });
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    sendDevResponse(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    sendProdResponse(res, err);
  }
};
