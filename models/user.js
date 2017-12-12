// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var User = sequelize.define('User', {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       password: {
//         type: DataTypes.STRING,
//         validate: {
//           len: {
//             args: [6, Infinity],
//             msg: 'Password should be 6 or more charcaters.'
//           },
//         }
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: {
//           args: true,
//           msg: 'That email is already taken.'
//         },
//         validate: {
//           isEmail: {
//             args: true,
//             msg: 'Not a valid email.'
//           },
//         }
//       }
//     });
//
//   User.associate = function(models) {
//     User.belongsToMany(models.Product, {through: 'UserProduct'});
//   }
//
//   return User;
// };

'use strict';

var Bookshelf = require('./database');

require('./product');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  products: function() {
    return this.belongsToMany('Product', 'users_products');
  }
});

module.exports = Bookshelf.model('User', User);