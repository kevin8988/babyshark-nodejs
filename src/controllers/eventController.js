const axios = require('axios');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { Event, EventsAddress, User, EventsUser } = require('./../models');
const { sequelize, Sequelize } = require('./../models/index');

exports.checkIfIsMyEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const event = await Event.findByPk(id);

  if (!event) {
    return next(new AppError('Nenhum evento encontrado!', 400));
  }

  if (!(event.userId === userId)) {
    return next(new AppError('Você não tem permissão para realizar essa ação!', 400));
  }

  next();
});

exports.checkIfIParticipateEvent = async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.user;
  const { and } = Sequelize.Op;

  const event = await Event.findOne({ where: { slug } });

  if (!event) {
    return next(new AppError('Nenhum evento encontrado!', 400));
  }

  const eventUser = await EventsUser.findOne({ where: { [and]: [{ userId: id }, { eventId: event.id }] } });

  if (eventUser) {
    return next(new AppError('Você ja está participando do evento!', 400));
  }

  req.event = event;

  next();
};

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const { like, or, and } = Sequelize.Op;
  const filter = {};
  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1;
  const skip = (page - 1) * limit;

  if (req.query.title) {
    const title = `%${req.query.title}%`;
    filter.title = { [like]: title };
  } else {
    filter.title = { [like]: '%%' };
  }

  if (req.query.cities) {
    const cities = req.query.cities.split(',').map(el => {
      return {
        city: el
      };
    });
    filter.cities = { [or]: cities };
  } else {
    filter.cities = null;
  }

  if (req.query.states) {
    const states = req.query.states.split(',').map(el => {
      return {
        state: el
      };
    });
    filter.states = { [or]: states };
  } else {
    filter.states = null;
  }

  const events = await Event.findAll({ where: { title: filter.title }, include: [{ model: EventsAddress, where: { [and]: [filter.cities, filter.states] } }] }, { offset: skip, limit });

  res.status(200).json({ status: 'success', results: events.length, data: { events } });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const event = await Event.findOne({ where: { slug }, include: [{ model: EventsAddress }, { model: User }] });

  if (!event) {
    return next(new AppError('Nenhum evento encontrado!', 400));
  }

  res.status(200).json({ status: 'success', data: { event } });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const { day, title, description, postalCode, number } = req.body;
  const { id } = req.user;
  let transaction;

  const url = `https://viacep.com.br/ws/${postalCode}/json/`;

  const address = await axios.get(url);

  if (address.data.erro) {
    return next(new AppError('Por favor, informe um CEP válido!', 400));
  }

  const { logradouro, complemento, bairro, localidade, uf } = address.data;

  try {
    transaction = await sequelize.transaction();

    const eventAddress = await EventsAddress.create(
      {
        city: localidade,
        state: uf,
        postalCode,
        street: logradouro,
        district: bairro,
        number,
        complement: complemento
      },
      { transaction }
    );

    const event = await Event.create(
      {
        day: new Date(day),
        title,
        description,
        userId: id,
        eventAddressId: eventAddress.id
      },
      { transaction }
    );

    res.status(201).json({ status: 'success', data: event });

    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(err);
  }
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { day, title, description } = req.body;

  const event = await Event.findByPk(id);

  if (!event) {
    return next(new AppError('Nenhum evento encontrado!', 400));
  }

  await event.update({ day, title, description });

  res.status(200).json({ status: 'success', data: { event } });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedEvent = await Event.destroy({ where: { id } });

  if (!deletedEvent) {
    return next(new AppError('Nenhum evento encontrado!', 400));
  }

  res.status(204).json({ status: 'success', data: null });
});

exports.participateEvent = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { event } = req;

  const eventUser = await EventsUser.create({
    eventId: event.id,
    userId: id
  });

  res.status(201).json({ status: 'success', data: { eventUser } });
});
