  var express = require('express');
var router = express.Router();
var user = require('../model/user');
/* GET home page. */
// var authenticate = function(req,res,next){
//   if(req.session){
//     if(req.session.user){
//       next()
//     }else{
//       res.redirect('/#login.html')
//     }
//   }else{
//     res.redirect('/#login.html')
//   }
// }
router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req.session){
    if(req.session.user){
      res.render('index',req.session.user)
    }else{
      console.log("Or here");
      res.render('index');
    }
  }else{
    console.log("here");
    res.render('index');
  }

  //res.render('login-register');
});

module.exports = router;
