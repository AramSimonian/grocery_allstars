const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const bookshelf = require('../models/database');

router.get('/', function(req, res, next) {
  Product.collection().query((qb) => {
    qb.where('created_at', '<=', new Date());
    qb.orderBy('created_at', 'DESC');
  })
    .fetch()
    .then((products) => {
      console.log(products);
      res.render('summary', {
        products: products
      });
    })
    .catch((err) => {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

router.post('/create', function (req, res) {

  const product = {
    name: req.body.name,
    description: req.body.description,
    barcode: req.body.barcode,
    expiry: new Date(req.body.expiry),
    productType: req.body.productType
  };

  bookshelf.transaction(function (t) {
    return Product
      .forge(product)
      .save(null, {
        transacting: t
      })
      .tap(function (product) {
        // updated pivot table `users_products`
        return product
          .users()
          .attach(req.user.id, {
            transacting: t
          });
      });
  })
    .then(function (product) {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
