module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    day: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    eventAddressId: DataTypes.INTEGER
  });

  Event.associate = function(models) {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
    Event.belongsTo(models.EventsAddress, { foreignKey: 'eventAdressId' });
    Event.belongsToMany(models.User, { through: 'EventsUser', foreignKey: 'eventId' });
  };

  return Event;
};
