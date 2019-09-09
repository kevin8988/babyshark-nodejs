const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
  const Donate = sequelize.define('Donate', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe um título!'
        },
        notNull: {
          msg: 'Por favor, informe um título!'
        },
        len: {
          args: [8, 20],
          msg: 'Por favor, informe um título válido!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe uma descrição!'
        },
        notNull: {
          msg: 'Por favor, informe uma descrição!'
        },
        len: {
          args: [60, 240],
          msg: 'Por favor, informe uma descrição válida!'
        }
      }
    },
    informations: DataTypes.STRING,
    slug: DataTypes.STRING,
    isDonated: DataTypes.BOOLEAN,
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe uma cor!'
        },
        notNull: {
          msg: 'Por favor, informe uma cor!'
        }
      }
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe um gênero!'
        },
        notNull: {
          msg: 'Por favor, informe um gênero!'
        }
      }
    },
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
    }
  });

  Donate.associate = function(models) {
    Donate.hasMany(models.DonatesPhoto);
    Donate.belongsTo(models.User, { foreignKey: 'userId' });
    Donate.belongsTo(models.Color, { foreignKey: 'colorId' });
    Donate.belongsTo(models.Gender, { foreignKey: 'genderId' });
    Donate.belongsToMany(models.User, { through: 'UsersInterestsDonates', foreignKey: 'donateId' });
    Donate.belongsToMany(models.Category, { through: 'DonatesCategories', foreignKey: 'donateId', as: 'categories' });
  };

  Donate.addHook('beforeCreate', donate => {
    donate.slug = slugify(donate.title, { lower: true });
  });

  return Donate;
};
