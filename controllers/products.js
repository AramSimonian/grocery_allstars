var Product = require('../models/product');
const express = require('express');
const router = express.Router();
const bookshelf = require('../models/database');

router.post('/create', function (req, res) {

  product = {
    name: req.body.name,
    barcode: req.body.barcode
  }

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
