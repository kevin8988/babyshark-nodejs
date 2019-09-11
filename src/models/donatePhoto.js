module.exports = (sequelize, DataTypes) => {
  const DonatesPhoto = sequelize.define('DonatesPhoto', {
    path: DataTypes.STRING,
    donateId: DataTypes.INTEGER
  });

  DonatesPhoto.associate = function(models) {
    DonatesPhoto.belongsTo(models.Donate, { foreignKey: 'donateId', as: 'Photos' });
  };

  return DonatesPhoto;
};
