// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Product = sequelize.define('Product', {
//     name: {
//       type: DataTypes.STRING,
//       validate: {
//         notEmpty: {
//           args: true,
//           msg: 'Name cannot be empty.'
//         },
//       }
//     },
//     barcode: {
//       type: DataTypes.STRING,
//       validate: {
//         notEmpty: {
//           args: true,
//           msg: 'Barcode cannot be empty.'
//         },
//       }
//     },
//   });
//
//   Product.associate = function(models) {
//     Product.belongsToMany(models.User, {through: 'UserProduct'});
//   }
//
//
//   return Product;
// };

'use strict';

var Bookshelf = require('./database');

require('./user');

var Product = Bookshelf.Model.extend({
  tableName: 'products',
  hasTimestamps: true,
  users: function() {
    return this.belongsToMany('User', 'users_products');
  }
});

module.exports = Bookshelf.model('Product', Product);