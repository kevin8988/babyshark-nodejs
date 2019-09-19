const slug = require('./../utils/slug');

const createSlug = title => {
  return slugify(`${title}-${Date.now()}`, { lower: true });
};

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    day: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe uma data para o evento!'
        },
        notNull: {
          msg: 'Por favor, informe uma data para o evento!'
        },
        isAfter: {
          args: new Date().toISOString(),
          msg: 'O dia do evento deve ser uma data posterior ao dia de hoje!'
        }
      }
    },
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
    slug: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
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
    eventAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Por favor, informe um endereço!'
        },
        notNull: {
          msg: 'Por favor, informe um endereço!'
        }
      }
    }
  });

  Event.associate = function(models) {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
    Event.belongsTo(models.EventsAddress, { foreignKey: 'eventAddressId' });
    Event.belongsToMany(models.User, { through: 'EventsUser', foreignKey: 'eventId' });
  };

  Event.addHook('beforeUpdate', event => {
    event.slug = slug(event.title);
  });

  Event.addHook('beforeCreate', event => {
    event.slug = slug(event.title);
  });

  return Event;
};
