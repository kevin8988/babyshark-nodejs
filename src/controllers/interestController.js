const { Sequelize } = require('./../models/index');
const { Donate } = require('./../models');
const { UsersInterestsDonate } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.checkIfIsMyDonate = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.user;

  const donate = await Donate.findOne({ where: { slug } });

  if (donate.userId === id) {
    return next(new AppError('Você não pode ser interessar pela própria doação!', 400));
  }

  next();
});

exports.checkExistingInterest = catchAsync(async (req, res, next) => {
  const { and } = Sequelize.Op;
  const { slug } = req.params;
  const { id } = req.user;

  const donate = await Donate.findOne({ where: { slug } });

  if (!donate) {
    return next(new AppError('Nenhuma doação encontrada!', 404));
  }

  const interest = await UsersInterestsDonate.findOne({ where: { [and]: [{ userId: id }, { donateId: donate.id }] } });

  if (interest) {
    return next(new AppError('Você já se interessou pela doação!', 400));
  }

  next();
});

exports.createInterest = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.user;
  const { message } = req.body;

  const donate = await Donate.findOne({ where: { slug } });

  const interest = await UsersInterestsDonate.create({
    userId: id,
    donateId: donate.id,
    message
  });

  res.status(201).json({ status: 'success', data: { interest } });
});
