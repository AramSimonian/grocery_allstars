var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Product.create({
    name: req.body.name,
    barcode: req.body.barcode
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
