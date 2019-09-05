const { Category } = require('./../../app/models');
const { Color } = require('./../../app/models');
const { Donate } = require('./../../app/models');
const { DonatesPhoto } = require('./../../app/models');
const { Gender } = require('./../../app/models');
const { User } = require('./../../app/models');
const { UsersAddress } = require('./../../app/models');
const { UsersInterestsDonate } = require('./../../app/models');
const { Event } = require('./../../app/models');
const { EventsAddress } = require('./../../app/models');

module.exports = async () => {
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
