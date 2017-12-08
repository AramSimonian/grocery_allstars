var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// // router.post('/', function(req, res){
// //
// //     console.log("hey", req.body)
//
// });

module.exports = router;
