var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
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

function isLoggedIn(req, res, next) {


 if (req.isAuthenticated()) {
   return next();
 }

 res.redirect('/login');

}

module.exports = router;
