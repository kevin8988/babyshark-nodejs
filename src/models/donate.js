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
    Donate.hasMany(models.DonatesPhoto);
    Donate.belongsTo(models.User, { foreignKey: 'userId' });
    Donate.belongsTo(models.Color, { foreignKey: 'colorId' });
    Donate.belongsTo(models.Gender, { foreignKey: 'genderId' });
    Donate.belongsToMany(models.User, { through: 'UsersInterestsDonates', foreignKey: 'donateId' });
    Donate.belongsToMany(models.Category, { through: 'DonatesCategories', foreignKey: 'donateId', as: 'categories' });
  };

  return Donate;
};
