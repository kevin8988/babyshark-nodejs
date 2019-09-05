const { Category } = require('./../models');
const { Color } = require('./../models');
const { Donate } = require('./../models');
const { DonatesPhoto } = require('./../models');
const { Gender } = require('./../models');
const { User } = require('./../models');
const { UsersAddress } = require('./../models');
const { UsersInterestsDonate } = require('./../models');
const { Event } = require('./../models');
const { EventsAddress } = require('./../models');

module.exports = async () => {
  const userAddress = await UsersAddress.create({
    city: 'São Paulo',
    state: 'SP'
  });

  const userOne = await User.create({
    firstName: 'Kevin',
    lastName: 'Silva',
    email: 'kevsilva07@gmail.com',
    password: 'kev',
    confirmPassword: 'kev',
    userAddressId: userAddress.id
  });

  const userTwo = await User.create({
    firstName: 'Luc',
    lastName: 'Silva',
    email: 'lucsilva07@gmail.com',
    password: 'luc',
    confirmPassword: 'luc',
    userAddressId: userAddress.id
  });

  const eventAddress = await EventsAddress.create({
    city: 'São Paulo',
    state: 'SP'
  });

  await Event.create({
    day: new Date(),
    title: 'Cool Event',
    description: 'Cool',
    userId: userOne.id,
    eventAddressId: eventAddress.id
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

  await DonatesPhoto.create({
    path: '/dsad/dsada/asd.png',
    donateId: donate.id
  });

  await donate.setCategories([categoryOne, categoryTwo]);

  await UsersInterestsDonate.create({
    userId: userTwo.id,
    donateId: donate.id,
    message: 'curti'
  });
};
