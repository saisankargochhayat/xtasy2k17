var express = require('express');
var router = express.Router();
var user = {username:'sansani'};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', user);
});

module.exports = router;
