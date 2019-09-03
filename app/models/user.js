module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 10]
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Donate);
  };

  return User;
};
