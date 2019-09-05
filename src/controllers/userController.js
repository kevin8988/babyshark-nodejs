const { User } = require('./../../app/models');
const { UsersAddress } = require('./../../app/models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../src/utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({ status: 'success', data: { users } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return next(new AppError('Nenhum usuário encontrado!', 404));
  }

  res.status(200).json({ status: 'success', data: { user } });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  });

  const userAddress = await UsersAddress.create();

  await User.update({ userAddressId: userAddress.id }, { where: { id: user.id } });

  res.status(201).json({ status: 'success', data: { user } });
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
