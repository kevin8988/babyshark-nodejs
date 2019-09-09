//const { promisify } = require('util');
//const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize } = require('./../models/index');
const { User } = require('./../models');
const { UsersAddress } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSentToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV.trim() === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

exports.signup = catchAsync(async (req, res, next) => {
  let transaction;
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    transaction = await sequelize.transaction();

    const userAddress = await UsersAddress.create({}, { transaction });

    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userAddressId: userAddress.id
      },
      { transaction }
    );

    await transaction.commit();

    createSentToken(user, 201, res);
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(err);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;

  // 1. Verify if has a password and email
  if (!password || !email) return next(new AppError('Por favor, informe seu e-mail e senha!', 400));

  const user = await User.scope('login').findOne({ where: { email } });

  // 2. Verify if has a valid email and password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('E-mail/Senha incorreto', 401));
  }

  createSentToken(user, 200, res);
});
