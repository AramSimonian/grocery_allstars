var User      = require('./user');
var Product     = require('./product');

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


  User.belongsToMany(Product, { through: UserProducts } );
  Product.belongsToMany(User, { through: UserProducts } );

  return UserProducts;
};