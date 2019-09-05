module.exports = (sequelize, DataTypes) => {
  const UsersInterestsDonate = sequelize.define('UsersInterestsDonate', {
    userId: DataTypes.INTEGER,
    donateId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.STRING
  });

  UsersInterestsDonate.associate = function(models) {
    UsersInterestsDonate.belongsTo(models.User, { foreignKey: 'userId' });
    UsersInterestsDonate.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return UsersInterestsDonate;
};
