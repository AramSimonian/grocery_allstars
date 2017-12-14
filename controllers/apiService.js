var express = require('express');
var router = express.Router();
var passport = require('passport');
var ApiService = require('../services/ApiService').ApiService;
const productLookup = new ApiService();

/* GET home page. */
router.get('/', function(req, res, next) {
  const objReturn = {};

  productLookup.getProductData(req.query.gtin, (response) => {

    const objProduct = JSON.parse(response);

    objReturn.gtin = req.query.gtin;

    productLookup.getGroceryData(objProduct.products[0].tpnc, (response) => {
      const objGrocery = JSON.parse(response);
      objReturn.name = objGrocery.uk.ghs.products.results[0].name;
      objReturn.image = objGrocery.uk.ghs.products.results[0].image;

      res.json(objReturn);
    });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   return next();
  }
 res.redirect('/auth/login');
}

 module.exports = router;
