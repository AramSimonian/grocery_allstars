var Product = require('../models/product');
var express = require('express');
var router = express.Router();
var ApiService = require('../services/ApiService').ApiService;
// var apiService = new ApiService();

const productLookup = new ApiService();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {

  productLookup.getProductData((response) => {
    javObj = JSON.parse(response);
    console.log(javObj);
  });

  Product.fetchAll({
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

console.log('req.isAuthenticated:', req.isAuthenticated());
 if (req.isAuthenticated()) {
   return next();
 }

 res.redirect('/auth/login');

}

module.exports = router;
