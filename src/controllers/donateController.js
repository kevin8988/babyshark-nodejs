const donateDAO = require('./../dao/donateDAO');
const catchAsync = require('./../utils/catchAsync');

exports.getDonates = catchAsync(async (req, res, next) => {
  const { query } = req;
  const donates = await donateDAO.getDonates(query);
  res.status(200).json({ status: 'success', data: { donates } });
});

exports.getDonate = catchAsync(async (req, res) => {
  const { params } = req;
  const donate = await donateDAO.getDonate(params.id);
  res.status(200).json({ status: 'success', data: { donate } });
});

exports.createDonate = catchAsync(async (req, res) => {
  const { body } = req;
  const donate = await donateDAO.create(body);
  res.status(201).json({ status: 'success', data: { donate } });
});

exports.updateDonate = catchAsync(async (req, res) => {
  const { params, body } = req;
  const donate = await donateDAO.update(params.id, body);
  res.status(200).json({ status: 'success', data: { donate } });
});

exports.deleteDonate = catchAsync(async (req, res) => {
  const { params } = req;
  await donateDAO.delete(params.id);
  res.status(204).send({ status: 'success', data: null });
});
