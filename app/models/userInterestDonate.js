module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    userId: DataTypes.INTEGER,
    donateId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.STRING
  });

  Interest.associate = function(models) {
    Interest.belongsTo(models.User, { foreignKey: 'userId' });
    Interest.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return Interest;
};
