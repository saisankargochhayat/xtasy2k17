var express = require('express');
var router = express.Router();
var user = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login-register');
});

router.get('/signup',function(req,res,next){
  var user1 = new user({
    name:'Hero user',
    password: 'abcd123',
    email: 'chiku@gmail.com',
    college:'CET',
    year:'4',
    phone:'90909',
    gender:'male'
  }
  );
  user1.save(function(err){
    if(err){
      console.log(err);
    }
  })
  res.end();
  console.log();
});

module.exports = router;
