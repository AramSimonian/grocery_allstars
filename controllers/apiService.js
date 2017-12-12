var express = require('express');
var router = express.Router();
var passport = require('passport');
var ApiService = require('../services/ApiService').ApiService;
const productLookup = new ApiService();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  productLookup.getProductData(params['gtin'], (response) => {
    javObj = JSON.parse(response);
    console.log(javObj);
  });

});

function isLoggedIn(req, res, next) {

console.log('req.isAuthenticated:', req.isAuthenticated());
 if (req.isAuthenticated()) {
   return next();
 }

 res.redirect('/auth/login');

}

 module.exports = router;
