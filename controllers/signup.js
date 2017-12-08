var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post(function(req, res) {
       console.log('processing');
       res.send('processing the signup form!');
   });

module.exports = router;
