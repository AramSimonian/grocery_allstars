'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          min: {
            len: [6, Infinity],
            msg: 'Password should be 6 or more charcaters.'
          },
        }
      },
      email: {
        type: DataTypes.STRING,
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
          // associations can be defined here
        }

      }
    });
  return User;
};