module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('DonatesPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      donateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Donates',
          key: 'id'
        }
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('DonatesPhotos');
  }
};
