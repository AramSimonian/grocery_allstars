var express = require('express');
var router = express.Router();
const Product = require('../models/product');

router.get('/', function(req, res, next) {
  Product.collection().query((qb) => {
    qb.where('expiry', '>=', new Date());
    qb.orderBy('expiry', 'ASC');
  })
    .fetch()
    .then((products) => {
      console.log(products);
      res.render('reports', {
        products: products
      });
    })
    .catch((err) => {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

// router.get('/', function(req, res, next) {
//   Product.collection().query((qb) => {
//     qb.where('created_at', '<=', new Date());
//     qb.orderBy('created_at', 'DESC');
//   })
//     .fetch()
//     .then((products) => {
//       console.log(products);
//       res.render('reports', {
//         products: products
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({error: true, data: {message: err.message}});
//     });
// });

module.exports = router;
