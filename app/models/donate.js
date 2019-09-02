module.exports = (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Donate;
};
