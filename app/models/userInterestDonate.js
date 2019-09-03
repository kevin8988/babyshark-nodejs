module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define('Interest', {
    message: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    donateId: DataTypes.INTEGER
  });

  Interest.associate = function(models) {
    Interest.belongsTo(models.User, { foreignKey: 'userId' });
    Interest.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return Interest;
};
