module.exports = (sequelize, DataTypes) => {
  const DonateCategory = sequelize.define('DonateCategory', {
    categoryId: DataTypes.INTEGER,
    donateId: DataTypes.INTEGER
  });

  DonateCategory.associate = function(models) {
    DonateCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
    DonateCategory.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return DonateCategory;
};
