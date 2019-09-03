const catchAsync = require('./../utils/catchAsync');
const { Donate } = require('./../../app/models');
const test = require('./../test/test');

exports.getDonates = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});

exports.getDonate = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});

exports.createDonate = catchAsync(async (req, res, next) => {
  try {
    await test();
    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    return next(error);
  }
});

exports.updateDonate = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});

exports.deleteDonate = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});
