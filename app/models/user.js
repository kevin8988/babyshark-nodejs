module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Por favor, informe um nome!'
        },
        len: {
          args: [3, 10],
          msg: 'Por favor, informe um nome válido!'
        },
        isAlpha: {
          msg: 'Por favor, informe um nome válido!'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Por favor, informe um nome!'
        },
        len: {
          args: [3, 20],
          msg: 'Por favor, informe um nome válido!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Por favor, informe um e-mail!'
        },
        isEmail: {
          args: true,
          msg: 'Por favor, informe um e-mail válido!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Por favor, informe uma senha!'
        },
        len: {
          args: [6, 20],
          msg: 'Por favor, informe um senha com no mínimo 6 caracteres!'
        }
      }
    },
    confirmPassword: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Por favor, informe confirme sua senha!'
        },
        passwordMatch(value) {
          if (value !== this.password) {
            throw new Error('Senhas diferentes!');
          }
        }
      }
    },
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    userAddressId: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.Donate);
    User.hasMany(models.Event);
    User.belongsTo(models.UsersAddress, { foreignKey: 'UsersAddresses' });
    User.belongsToMany(models.Donate, { through: 'UsersInterestsDonates', foreignKey: 'userId' });
  };

  return User;
};
