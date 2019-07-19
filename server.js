const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');
const app = require('./app');

const databaseUrl = {
  production: process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  development: process.env.DATABASE_URL_LOCALHOST
};

mongoose.connect(databaseUrl[process.env.NODE_ENV.trim()], {
  useNewUrlParser: true
});

app.listen(process.env.PORT, () => {});
