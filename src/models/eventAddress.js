module.exports = (sequelize, DataTypes) => {
  const EventsAddress = sequelize.define('EventsAddress', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return EventsAddress;
};
