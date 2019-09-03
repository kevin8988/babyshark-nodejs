module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Donate_Category', {
      categoryId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      donateId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Donates',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('Donate_Category');
  }
};
