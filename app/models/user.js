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
    User.belongsTo(models.UserAddress, { foreignKey: 'userAddressId' });
    User.belongsToMany(models.Interest, { through: 'User_Interest_Donate', foreignKey: 'userId' });
  };

  return User;
};
