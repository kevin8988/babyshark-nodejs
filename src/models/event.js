const slugify = require('slugify');

const createSlug = title => {
  return slugify(`${title}-${Date.now()}`, { lower: true });
};

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    day: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    eventAddressId: DataTypes.INTEGER
  });

  Event.associate = function(models) {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
    Event.belongsTo(models.EventsAddress, { foreignKey: 'eventAddressId' });
    Event.belongsToMany(models.User, { through: 'EventsUser', foreignKey: 'eventId' });
  };

  Event.addHook('beforeUpdate', event => {
    event.slug = createSlug(event.title);
  });

  Event.addHook('beforeCreate', event => {
    event.slug = createSlug(event.title);
  });

  return Event;
};
