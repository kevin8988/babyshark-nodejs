const catchAsync = require('./../utils/catchAsync');
const { Event, EventsAddress, User } = require('./../models');
const { sequelize } = require('./../models/index');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = Event.findAll({ include: [{ model: EventsAddress }] });

  res.status(200).json({ status: 'success', results: events.length, data: { events } });
});

exports.getEvent = (req, res) => {
  const { slug } = req.params;

  const event = Event.findOne({ where: { slug }, include: [{ model: EventsAddress }, { model: User }] });

  res.status(200).json({ status: 'success', data: { event } });
};

exports.createEvent = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};

exports.updateEvent = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};

exports.deleteEvent = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};
