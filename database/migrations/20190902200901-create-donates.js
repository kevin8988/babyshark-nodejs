module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Donates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      informations: {
        allowNull: false,
        type: DataTypes.STRING
      },
      slug: {
        type: DataTypes.STRING
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Colors',
          key: 'id'
        }
      },
      genderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Genders',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
    return queryInterface.dropTable('Donates');
  }
};
