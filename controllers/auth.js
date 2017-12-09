var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

router.post('/register', passport.authenticate('local-register', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/register'
    }

));

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login'
    }

));

/* GET users listing. */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

module.exports = router;