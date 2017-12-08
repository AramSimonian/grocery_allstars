var express = require('express');
var router = express.Router();

var passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

// router.post('/', function(req, res) {
//   res.redirect('/');
// });

router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }

));

module.exports = router;
