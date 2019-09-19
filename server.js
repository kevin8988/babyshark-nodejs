const dotenv = require('dotenv');

dotenv.config();
const db = require('./src/models/index');
const app = require('./app');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception... Shutting down...');
  console.error(err);

  process.exit(1);
});

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
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection... Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
