module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('UsersDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cpf: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.DATE
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
    return queryInterface.dropTable('UsersDetails');
  }
};
