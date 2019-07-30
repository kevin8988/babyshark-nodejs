const donateDAO = require('./../dao/donateDAO');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getDonates = catchAsync(async (req, res, next) => {
  const { query } = req;
  const donates = await donateDAO.getDonates(query);
  res.status(200).json({ status: 'success', results: donates.length, data: { donates } });
});

exports.getDonate = catchAsync(async (req, res, next) => {
  const { params } = req;
  const donate = await donateDAO.getDonate(params.id);

  if (!donate) {
    return next(new AppError(`Donate not found with this id ${params.id}`, 404));
  }

  res.status(200).json({ status: 'success', data: { donate } });
});

exports.createDonate = catchAsync(async (req, res, next) => {
  const { body } = req;
  const donate = await donateDAO.create(body);
  res.status(201).json({ status: 'success', data: { donate } });
});

exports.updateDonate = catchAsync(async (req, res, next) => {
  const { params, body } = req;
  const donate = await donateDAO.update(params.id, body);

  if (!donate) {
    return next(new AppError(`Donate not found with this id ${params.id}`, 404));
  }

  res.status(200).json({ status: 'success', data: { donate } });
});

exports.deleteDonate = catchAsync(async (req, res, next) => {
  const { params } = req;
  const donate = await donateDAO.delete(params.id);

  if (!donate) {
    return next(new AppError(`Donate not found with this id ${params.id}`, 404));
  }

  res.status(204).send({ status: 'success', data: null });
});
