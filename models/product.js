'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty.'
        },
      }
    },
    barcode: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Barcode cannot be empty.'
        },
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Product;
};
