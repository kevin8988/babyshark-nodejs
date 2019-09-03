module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('UserAddress', {
    city: DataTypes.STRING,
    state: DataTypes.STRING
  });

  return UserAddress;
};
