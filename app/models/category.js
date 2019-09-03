module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
    Category.belongsToMany(models.Donate, { through: 'DonatesCategories', foreignKey: 'categoryId' });
  };

  return Category;
};
