const Donate = require('../models/Donate');

exports.create = async data => {
  const donate = await Donate.create(data);
  return donate;
};

exports.getDonates = async () => {
  const donates = await Donate.find();
  return donates;
};

exports.getDonate = async id => {
  const donate = await Donate.findById(id);
  return donate;
};

exports.update = async (id, data) => {
  const donate = await Donate.findByIdAndUpdate(id, data, {
    new: true,
    runValidator: true
  });
  return donate;
};

exports.delete = async id => {
  const donate = await Donate.findByIdAndDelete(id);
  return donate;
};
