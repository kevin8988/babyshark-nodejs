const { Category } = require('./../../app/models');
const { Color } = require('./../../app/models');
const { Donate } = require('./../../app/models');
const { Gender } = require('./../../app/models');
const { User } = require('./../../app/models');
const { UsersAddress } = require('./../../app/models');
const { UsersInterestsDonate } = require('./../../app/models');

module.exports = async () => {
  console.log('aquio');
  const userAddress = await UsersAddress.create({
    city: 'São Paulo',
    state: 'SP'
  });

  const userOne = await User.create({
    name: 'Kevin',
    email: 'kevsilva07@gmail.com',
    password: 'kev',
    confirmPassword: 'kev',
    userAddressId: userAddress.id
  });

  const userTwo = await User.create({
    name: 'Luc',
    email: 'lucsilva07@gmail.com',
    password: 'luc',
    confirmPassword: 'luc',
    userAddressId: userAddress.id
  });

  const color = await Color.create({
    name: 'vermelho',
    hexCode: '#321312'
  });

  const gender = await Gender.create({
    name: 'Masculino'
  });

  const categoryOne = await Category.create({
    name: 'Brinquedo'
  });

  const categoryTwo = await Category.create({
    name: 'Roupa'
  });

  const donate = await Donate.create({
    title: 'roupa nova',
    description: 'blabla',
    informations: 'sadsad',
    colorId: color.id,
    genderId: gender.id,
    userId: userOne.id
  });

  await donate.setCategories([categoryOne, categoryTwo]);

  await UsersInterestsDonate.create({
    userId: userTwo.id,
    donateId: donate.id,
    message: 'curti'
  });

  console.log('Ok');
};
