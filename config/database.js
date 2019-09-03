module.exports = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_URL_LOCALHOST,
  dialect: process.env.DATABASE_DIALECT
};
