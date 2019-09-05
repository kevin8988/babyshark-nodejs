module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING,
    hexCode: DataTypes.STRING
  });

  Color.associate = function(models) {
    Color.hasMany(models.Donate);
  };

  return Color;
};
