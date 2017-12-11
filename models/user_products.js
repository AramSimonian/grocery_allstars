
'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserProducts = sequelize.define('UserProducts', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['', 'consumed', 'discarded']
    }
  });

  return UserProducts;
};