const express = require('express');
const cookieParser = require('cookie-parser');
const donateRouter = require('./src/routes/donateRouter');
const userRouter = require('./src/routes/userRouter');
const eventRouter = require('./src/routes/eventRouter');
const errorController = require('./src/controllers/errorController');
const AppError = require('./src/utils/appError');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/donates', donateRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(errorController);

module.exports = app;
