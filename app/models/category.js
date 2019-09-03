module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
    Category.belongsToMany(models.DonateCategory, { through: 'Donate_Category', foreignKey: 'categoryId' });
  };

  return Category;
};
