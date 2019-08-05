const catchAsync = require('./../utils/catchAsync');
const userDAO = require('./../dao/userDAO');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userDAO.getAllUsers();
  res.status(200).json({ status: 'success', results: users.length, data: { users } });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not working yet'
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await userDAO.createUser(req.body);
  res.status(201).json({ status: 'success', data: { user: newUser } });
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
