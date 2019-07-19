const Donate = require('../models/Donate');

exports.create = async data => {
  const donate = await Donate.create(data);
  return donate;
};
