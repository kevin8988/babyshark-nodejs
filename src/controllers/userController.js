const { User, UsersAddress, UsersDetail, Donate, DonatesPhoto, UsersInterestsDonate, Event, EventsAddress } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../src/utils/appError');

exports.getMe = async (req, res, next) => {
  req.params = { id: req.user.id };
  next();
};

exports.getMyDonates = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const donates = await Donate.findAll({ where: { userId: id }, include: [{ attributes: ['id', 'path'], model: DonatesPhoto, as: 'Photos' }] });

  res.status(200).json({ status: 'success', results: donates.length, data: { donates } });
});

exports.getMyInterests = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const interests = await UsersInterestsDonate.findAll({
    attributes: ['id', 'message', 'status'],
    where: { userId: id },
    include: [
      {
        model: Donate,
        attributes: ['id', 'title', 'description', 'informations', 'slug'],
        include: [{ attributes: ['id', 'path'], model: DonatesPhoto, as: 'Photos' }, { attributes: ['id', 'firstName', 'lastName', 'email'], model: User }]
      }
    ]
  });

  res.status(200).json({ status: 'success', results: interests.length, data: { interests } });
});

exports.getMyDonatesInterests = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const donatesInterests = await UsersInterestsDonate.findAll({ include: [{ model: Donate, where: { userId: id } }, { model: User }] });

  res.status(200).json({ status: 'success', results: donatesInterests.length, data: { donatesInterests } });
});

exports.getMyEvents = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const events = await Event.findAll({ where: { userId: id }, include: [{ model: EventsAddress }] });

  res.status(200).json({ status: 'success', results: events.length, data: { events } });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ include: [{ model: UsersAddress }, { model: UsersDetail }] });

  res.status(200).json({ status: 'success', data: { users } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id, { include: [{ model: UsersAddress }, { model: UsersDetail }] });

  if (!user) {
    return next(new AppError('Nenhum usuário encontrado!', 404));
  }

  res.status(200).json({ status: 'success', data: { user } });
});

exports.createUser = catchAsync(async (req, res, next) => {
  res.status(400).json({ status: 'error', message: 'Por favor, utilize o sign in!' });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  const rows = await User.update({ firstName, lastName, email }, { where: { id } });

  if (!rows[0]) {
    return next(new AppError('Nenhum usuário encontrado', 404));
  }

  res.status(201).json({ status: 'success', message: 'Usuário foi atualizado!' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const rows = await User.update({ active: false }, { where: { id } });

  if (!rows[0]) {
    return next(new AppError('Nenhum usuário encontrado', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});
