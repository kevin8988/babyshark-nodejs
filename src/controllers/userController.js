const { User } = require('./../../app/models');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'error',
    data: { users }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(User);

  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};
