var Product = require('../models/product');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Product.fetchAll({
    // include: [ models.Task ]
  }).then(function (products) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      products: products
    });
  }).catch(err => {
    res.json({error: err.message});
  });
});

module.exports = router;
