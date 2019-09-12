module.exports = (sequelize, DataTypes) => {
  const EventsUser = sequelize.define('EventsUser', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  EventsUser.associate = function(models) {
    EventsUser.belongsTo(models.Event, { foreignKey: 'eventId' });
    EventsUser.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return EventsUser;
};
