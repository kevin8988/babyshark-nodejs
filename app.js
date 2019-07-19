const express = require('express');
const donateRouter = require('./routes/donateRouter');
const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');

const app = express();

app.use(express.json());
app.use('/api/v1/donates', donateRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

module.exports = app;
