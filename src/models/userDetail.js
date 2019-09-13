module.exports = (sequelize, DataTypes) => {
  const UsersDetail = sequelize.define('UsersDetail', {
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE
  });

  return UsersDetail;
};
