const express = require('express');
const donateRouter = require('./src/routes/donateRouter');
const userRouter = require('./src/routes/userRouter');
const eventRouter = require('./src/routes/eventRouter');

const app = express();

app.use(express.json());
app.use('/api/v1/donates', donateRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

module.exports = app;
