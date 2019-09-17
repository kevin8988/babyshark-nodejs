const catchAsync = require('./../utils/catchAsync');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
});

exports.getEvent = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
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
