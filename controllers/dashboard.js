var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Product.findAll({
    // include: [ models.Task ]
  }).then(function(products) {
    res.render('dashboard', {
      title: 'Enter product details',
      products: products
    });
  });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
