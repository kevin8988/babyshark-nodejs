const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');
const app = require('./app');

const databaseUrl = {
  production: process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  development: process.env.DATABASE_URL_LOCALHOST
};

mongoose.connect(
  databaseUrl[process.env.NODE_ENV.trim()],
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log('Database connected');
  }
);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
