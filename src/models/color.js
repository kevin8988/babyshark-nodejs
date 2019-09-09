module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING,
    hexCode: DataTypes.STRING
  });

  return Color;
};
