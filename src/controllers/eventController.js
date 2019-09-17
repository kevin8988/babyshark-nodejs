const axios = require('axios');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { Event, EventsAddress, User } = require('./../models');
const { sequelize } = require('./../models/index');

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

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.findAll();

  res.status(200).json({ status: 'success', results: events.length, data: { events } });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const event = Event.findOne({ where: { slug }, include: [{ model: EventsAddress }, { model: User }] });

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
