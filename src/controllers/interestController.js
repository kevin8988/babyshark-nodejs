const { Sequelize } = require('./../models/index');
const { sequelize } = require('./../models/index');
const { Donate, UsersInterestsDonate, User } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

exports.checkIfIsNotMyDonate = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.user;

  const donate = await Donate.findOne({ where: { slug } });

  if (!donate) {
    return next(new AppError('Doação não encontrada!', 404));
  }

  if (donate.userId === id) {
    return next(new AppError('Você não pode ser interessar pela própria doação!', 400));
  }

  req.donate = donate;

  next();
});

exports.checkExistingInterest = catchAsync(async (req, res, next) => {
  const { and } = Sequelize.Op;
  const { donate } = req;
  const { id } = req.user;

  const interest = await UsersInterestsDonate.findOne({ where: { [and]: [{ userId: id }, { donateId: donate.id }] } });

  if (interest) {
    return next(new AppError('Você já se interessou pela doação!', 400));
  }

  next();
});

exports.checkIfIsMyInterest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const interest = await UsersInterestsDonate.findByPk(id, { include: [{ model: Donate }] });

  if (!interest) {
    return next(new AppError('Nenhum interesse encontrado!', 404));
  }

  if (!(interest.Donate.userId === userId)) {
    return next(new AppError('Você não tem permissão para realizar essa ação!', 400));
  }

  req.interest = interest;

  next();
});

exports.createInterest = catchAsync(async (req, res, next) => {
  const { donate } = req;
  const { id } = req.user;
  const { message } = req.body;

  const interest = await UsersInterestsDonate.create({
    userId: id,
    donateId: donate.id,
    message
  });

  const user = await User.findByPk(donate.userId);

  const url = `${req.protocol}://${req.get('host')}/me/donates/interests`;
  await new Email(user, url, donate).sendInterest();

  res.status(201).json({ status: 'success', data: { interest } });
});

exports.acceptInterest = catchAsync(async (req, res, next) => {
  const { and, ne } = Sequelize.Op;
  const { interest } = req;

  let transaction;

  try {
    transaction = await sequelize.transaction();

    await Donate.update({ isDonated: true }, { where: { id: interest.donateId } }, { transaction });
    await interest.update({ status: 'ACEITO' }, { transaction });
    await UsersInterestsDonate.update({ status: 'RECUSADO' }, { where: { [and]: [{ donateId: interest.donateId }, { id: { [ne]: interest.id } }] } }, { transaction });

    res.status(200).json({ status: 'success', data: { interest } });

    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(new AppError('Não foi possível concluir a ação!', 403));
  }
});

exports.declineInterest = catchAsync(async (req, res, next) => {
  const { interest } = req;

  await interest.update({ status: 'RECUSADO' });

  res.status(200).json({ status: 'success', data: { interest } });
});
