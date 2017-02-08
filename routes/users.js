var express = require('express');
var router = express.Router();
var user = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function(req,res,next){
  var newUser = new user({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    college: req.body.college,
    year: req.body.year,
    phone: req.body.phone,
    gender: req.body.gender
  });
  newUser.save(function(err){
    if(err){
      console.log(err.stack);
    }
    user.find({email:req.body.email},function(err,foundUser){
      if(err){
        console.log(err);
      }
      res.send(foundUser);
    });
  });
});

router.post('/login',function(req,res,next){
  user.findOne({email:req.body.login_email},function(err,foundUser){
    if(err){
      console.log(err);
    }
    if(foundUser.password == req.body.login_password){
      res.send(foundUser);
    }
    else{
      res.send('user not found');
    }
  });
});

module.exports = router;
