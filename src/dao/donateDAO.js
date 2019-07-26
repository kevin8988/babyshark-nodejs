const Donate = require('../models/Donate');
const ApiFeatures = require('./../utils/apiFeatures');

exports.create = async data => {
  const donate = await Donate.create(data);
  return donate;
};

exports.getDonates = async queryParam => {
  const apiFeatures = new ApiFeatures(Donate.find(), queryParam).filter().fields();
  const donates = await apiFeatures.query;
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
