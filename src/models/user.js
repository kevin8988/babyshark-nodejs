const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, informe um nome!'
          },
          notNull: {
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
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, informe um sobrenome!'
          },
          notNull: {
            msg: 'Por favor, informe um sobrenome!'
          },
          len: {
            args: [3, 20],
            msg: 'Por favor, informe um nome válido!'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Ow, parece que já existe uma conta com esse e-mail!.'
        },
        validate: {
          notEmpty: {
            msg: 'Por favor, informe um e-mail!'
          },
          notNull: {
            msg: 'Por favor, informe um e-mail!'
          },
          isEmail: {
            msg: 'Por favor, informe um e-mail válido!'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, informe uma senha!'
          },
          notNull: {
            msg: 'Por favor, informe uma senha!'
          },
          len: {
            args: [6, 20],
            msg: 'Por favor, informe uma senha com no mínimo 6 caracteres!'
          }
        }
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Por favor, confirme sua senha!'
          },
          notNull: {
            msg: 'Por favor, confirme sua senha!'
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
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'confirmPassword'] }
      }
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Donate);
    User.hasMany(models.Event);
    User.belongsTo(models.UsersAddress, { foreignKey: 'userAddressId' });
    User.belongsToMany(models.Donate, { through: 'UsersInterestsDonates', foreignKey: 'userId' });
  };

  User.addHook('afterValidate', async user => {
    const encryptedPassword = await bcrypt.hash(user.password, 12);
    user.password = encryptedPassword;
    user.confirmPassword = encryptedPassword;
  });

  return User;
};