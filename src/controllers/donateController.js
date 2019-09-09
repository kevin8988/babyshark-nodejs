const catchAsync = require('./../utils/catchAsync');
const { Donate } = require('./../models');
const { Category } = require('./../models');
//const test = require('./../test/test');

exports.getDonates = catchAsync(async (req, res, next) => {
  const donates = await Donate.findAll();

  res.status(200).json({
    status: 'success',
    data: { donates }
  });
});

exports.getDonate = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});

exports.createDonate = catchAsync(async (req, res, next) => {
  const { title, description, informations, colorId, genderId, categoriesId } = req.body;

  const donate = await Donate.create({
    title,
    description,
    informations,
    colorId,
    genderId,
    userId: req.user.id
  });

  const categories = await Promise.all(categoriesId.map(async el => await Category.findByPk(el)));

  await donate.setCategories(categories);

  res.status(201).json({ status: 'success', data: { donate } });
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
