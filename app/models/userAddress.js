module.exports = (sequelize, DataTypes) => {
  const UsersAddress = sequelize.define('UsersAddress', {
    city: DataTypes.STRING,
    state: DataTypes.STRING
  });

  return UsersAddress;
};
