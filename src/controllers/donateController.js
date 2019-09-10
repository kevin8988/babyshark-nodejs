const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../src/utils/appError');
const { sequelize } = require('./../models/index');
const { Donate } = require('./../models');
const { Category } = require('./../models');
const { Color } = require('./../models');
const { Gender } = require('./../models');
const { DonatesPhoto } = require('./../models');
const { DonatesCategory } = require('./../models');

exports.getDonates = catchAsync(async (req, res, next) => {
  const donates = await Donate.findAll({
    include: [{ model: Color }, { model: Category }, { model: Gender }, { model: DonatesPhoto, as: 'Photos' }]
  });

  res.status(200).json({ status: 'success', data: { donates } });
});

exports.getDonate = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const donate = await Donate.findAll({ where: { id }, include: [{ model: Color }, { model: Category }, { model: Gender }, { model: DonatesPhoto, as: 'Photos' }] });

  if (!donate) {
    return next(new AppError('Nenhuma doação encontrada!', 404));
  }

  res.status(200).json({ status: 'success', data: { donate } });
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

  if (!categoriesId) {
    return new AppError('Doação deve ter categorias!', 400);
  }

  const categories = await Promise.all(categoriesId.map(async el => await Category.findByPk(el)));
  await donate.setCategories(categories);

  res.status(201).json({ status: 'success', data: { donate } });
});

exports.updateDonate = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { title, description, informations, colorId, genderId, categoriesId, userId } = req.body;

  const donate = await Donate.findByPk(id);

  if (!donate) {
    return next(new AppError('Nenhuma doação encontrada!', 404));
  }

  await donate.update({ title, description, informations, colorId, genderId, userId });

  if (categoriesId) {
    const categories = await Promise.all(categoriesId.map(async el => await Category.findByPk(el)));
    await donate.setCategories(categories);
  }

  res.status(201).json({ status: 'success', data: { donate } });
});

exports.deleteDonate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await DonatesPhoto.destroy({ where: { donateId: id } }, { transaction });

    await DonatesCategory.destroy({ where: { donateId: id } }, { transaction });

    await Donate.destroy({ where: { id } }, { transaction });

    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(err);
  }

  res.status(204).json({ status: 'success', data: null });
});
