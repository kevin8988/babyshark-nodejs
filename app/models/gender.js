module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define('Gender', {
    name: DataTypes.STRING
  });

  Gender.associate = function(models) {
    Gender.hasMany(models.Donate);
  };

  return Gender;
};
