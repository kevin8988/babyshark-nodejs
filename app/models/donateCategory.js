module.exports = (sequelize, DataTypes) => {
  const DonatesCategory = sequelize.define('DonatesCategory', {
    categoryId: DataTypes.INTEGER,
    donateId: DataTypes.INTEGER
  });

  DonatesCategory.associate = function(models) {
    DonatesCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
    DonatesCategory.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return DonatesCategory;
};
