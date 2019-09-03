module.exports = (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    informations: DataTypes.STRING,
    colorId: DataTypes.INTEGER,
    genderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Donate.associate = function(models) {
    Donate.belongsTo(models.User, { foreignKey: 'userId' });
    Donate.belongsTo(models.Color, { foreignKey: 'colorId' });
    Donate.belongsTo(models.Gender, { foreignKey: 'genderId' });
    Donate.belongsToMany(models.Interest, { through: 'User_Interest_Donate', foreignKey: 'donateId' });
    Donate.belongsToMany(models.DonateCategory, { through: 'Donate_Category', foreignKey: 'categoryId' });
  };

  return Donate;
};
