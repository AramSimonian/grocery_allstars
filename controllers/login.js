var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function (req, res) {
    res.send('Add a book');
  }) ;

module.exports = router;
