module.exports = (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Donate.associate = function(models) {
    Donate.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Donate;
};
