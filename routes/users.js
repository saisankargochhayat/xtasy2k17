var express = require('express');
var router = express.Router();
// var mailer = require('node-mailer');
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

  // new mailer.Mail({
	//    from: 'noreply@domain.com',
	//    to: newUser.email,
	//    subject: 'Account verification for XTASY 2k17',
	//    body: 'verify your account by visiting http://localhosl:3000/user/verify/id',
	//    callback: function(err, data){
	// 	  console.log(err);
	// 	  console.log(data);
	//    }
  // });

  newUser.save(function(err){
    if(err){
      console.log(err.stack);
    }
    else{
      req.session.user = user;
      res.json(newUser);
    }
  });
});

router.post('/login',function(req,res,next){
  user.findOne({email:req.body.login_email},function(err,foundUser){
    if(err){
      console.log(err);
    }
    // test a matching password
        foundUser.comparePassword(req.body.login_password, function(err, isMatch) {
            if (err) throw err;
            if(isMatch) {
              req.session.user = user;
              res.send(foundUser);
            }
            else {
              foundUser = {}
              res.send(foundUser);
            }
        });
  });
});

module.exports = router;
