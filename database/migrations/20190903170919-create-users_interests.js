module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('UsersInterestsDonates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      donateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Donates',
          key: 'id'
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDENTE'
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
    return queryInterface.dropTable('UsersInterestsDonates');
  }
};
