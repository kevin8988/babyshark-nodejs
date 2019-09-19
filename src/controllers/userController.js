const { User, UsersAddress, UsersDetail, Donate, DonatesPhoto, UsersInterestsDonate, Event, EventsAddress, EventsUser } = require('./../models');
const { sequelize } = require('./../models/index');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../src/utils/appError');

exports.getMe = async (req, res, next) => {
  req.params = { id: req.user.id };
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Não pode atualizar a senha nessa rota!', 400));
  }

  const { user } = req;
  const { firstName, lastName, email } = req.body;
  const { city, state } = req.body;
  const { cpf, phone, gender, birthday } = req.body;

  let transaction;

  try {
    transaction = await sequelize.transaction();

    await User.update({ firstName, lastName, email }, { where: { id: user.id } }, { transaction });
    await UsersAddress.update({ city, state }, { where: { id: user.userAddressId } }, { transaction });
    await UsersDetail.update({ cpf, phone, gender, birthday }, { where: { id: user.userDetailId } }, { transaction });

    await transaction.commit();

    res.status(200).json({ status: 'success', message: 'Usuário foi atualizado!' });
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(err);
  }
});

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

exports.getMyEventsParticipants = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const eventsUser = await EventsUser.findAll({
    group: ['eventId'],
    attributes: ['eventId', [EventsUser.sequelize.fn('COUNT', 'eventId'), 'Participants']],
    include: [{ model: Event, where: { userId: id } }]
  });

  res.status(200).json({ status: 'success', results: eventsUser.length, data: { eventsUser } });
});

exports.getMyParticipateEvents = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const eventsUser = await EventsUser.findAll({ where: { userId: id }, include: [{ model: Event }] });

  res.status(200).json({ status: 'success', results: eventsUser.length, data: { eventsUser } });
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

  res.status(200).json({ status: 'success', message: 'Usuário foi atualizado!' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const rows = await User.update({ active: false }, { where: { id } });

  if (!rows[0]) {
    return next(new AppError('Nenhum usuário encontrado', 404));
  }

  res.status(204).json({ status: 'success', data: null });
});
