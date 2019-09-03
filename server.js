const dotenv = require('dotenv');

dotenv.config();
const db = require('./app/models/index.js');
const app = require('./app');

/* const databaseUrl = {
  production: process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
  development: process.env.DATABASE_URL_LOCALHOST
}; */

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
