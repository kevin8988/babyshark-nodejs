module.exports = (sequelize, DataTypes) => {
  const UsersInterestsDonate = sequelize.define('UsersInterestsDonate', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe um usuário!'
        },
        notNull: {
          msg: 'Por favor, informe um usuário!'
        }
      }
    },
    donateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe uma doação!'
        },
        notNull: {
          msg: 'Por favor, informe uma doação!'
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 240],
          msg: 'Por favor, informe uma mensagem válida!'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe um status!'
        },
        notNull: {
          msg: 'Por favor, informe um status!'
        },
        isIn: {
          args: [['ACEITO', 'RECUSADO', 'PENDENTE']],
          msg: 'O status deve ser ACEITO, RECUSADO ou PENDENTE'
        }
      }
    }
  });

  UsersInterestsDonate.associate = function(models) {
    UsersInterestsDonate.belongsTo(models.User, { foreignKey: 'userId' });
    UsersInterestsDonate.belongsTo(models.Donate, { foreignKey: 'donateId' });
  };

  return UsersInterestsDonate;
};
