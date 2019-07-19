const Donate = require('../models/Donate');

exports.create = async data => {
  const donate = await Donate.create(data);
  return donate;
};

exports.getDonates = async () => {
  const donates = await Donate.find();
  return donates;
};
