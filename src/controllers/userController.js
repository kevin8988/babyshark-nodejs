const { User } = require('./../../app/models');
const { UsersAddress } = require('./../../app/models');
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
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  });

  const userAddress = await UsersAddress.create({
    state: 'SP',
    city: 'São Paulo'
  });

  await User.update({ userAddressId: userAddress.id }, { where: { id: user.id } });

  res.status(201).json({
    status: 'success',
    data: { user }
  });
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
