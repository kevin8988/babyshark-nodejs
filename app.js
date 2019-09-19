const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');

const donateRouter = require('./src/routes/donateRouter');
const userRouter = require('./src/routes/userRouter');
const eventRouter = require('./src/routes/eventRouter');
const errorController = require('./src/controllers/errorController');
const AppError = require('./src/utils/appError');

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('templates', path.join(__dirname, 'src', 'templates'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/donates', donateRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`${req.originalUrl} não encontrada!`, 404));
});

app.use(errorController);

module.exports = app;
