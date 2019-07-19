const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');

const app = require('./app');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

app.listen(process.env.PORT, () => {});
