var express = require('express');
var router = express.Router();
var passport = require('passport');
var ApiService = require('../services/ApiService').ApiService;
const productLookup = new ApiService();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  productLookup.getProductData(req.query.gtin, (response) => {
    // const javObj = JSON.parse(response);
    // console.log(j  avObj);
    res.json(response);
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
