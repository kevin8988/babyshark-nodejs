const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

/* const databaseUrl = {
  production: process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  development: process.env.DATABASE_URL_LOCALHOST
}; */

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
