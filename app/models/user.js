module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    userAddressId: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.Donate);
    User.hasMany(models.Event);
    User.belongsTo(models.UsersAddress, { foreignKey: 'UsersAddresses' });
    User.belongsToMany(models.Donate, { through: 'UsersInterestsDonates', foreignKey: 'userId' });
  };

  return User;
};
