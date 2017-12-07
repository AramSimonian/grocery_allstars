var models  = require('../models');
var express = require('express');
var router  = express.Router();
var Sequelize = require('sequelize')

router.post('/create', function(req, res) {
  models.Product.create({
    name: req.body.name,
    barcode: req.body.barcode
  }).then(function() {
    res.redirect('/');
  }).catch(Sequelize.ValidationError, function (err) {
      // respond with validation errors
      return res.status(422).send(err.errors);
  }).catch(function (err) {
      // every other error
      return res.status(400).send({
          message: err.message
      });
  });
});

module.exports = router;
