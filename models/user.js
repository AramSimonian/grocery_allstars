'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, Infinity],
            msg: 'Password should be 6 or more charcaters.'
          },
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'That email is already taken.'
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Not a valid email.'
          },
        }
      }
    },
    {
      classMethods: {
        associate: function (models) {

        }

      }
    });

  return User;
};