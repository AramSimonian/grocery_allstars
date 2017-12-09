var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function (req, res) {
  res.redirect('/');
}) ;

router.post('/', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/login'
    }

));

module.exports = router;
