module.exports = (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  });

  Donate.associate = function(models) {
    Donate.belongsTo(models.User, { foreignKey: 'userId' });
    Donate.belongsTo(models.Color, { foreignKey: 'colorId' });
    Donate.belongsToMany(models.Interest, { through: 'User_Interest_Donate', foreignKey: 'donateId' });
  };

  return Donate;
};
