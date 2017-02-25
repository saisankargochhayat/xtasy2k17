var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mailer = require('node-mailer');
var user = require('../model/user');
var Events = require('../model/events'),
var md5 = require('md5');
var validator = require('email-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin');
});

// var authenticate = function(){
//   if(req.session){
//     if(req.session.user){
//       i
//     }else{
//       res.redirect('/')
//     }
//   }else{
//     res.redirect('/')
//   }
// }

//register form action/url -> /users/register
// router.get('/get_all', authenticate,function(req, res, next) {
//   Events.find({},function(err,events){
//     if(err){
//       console.log(err);
//       res.send('err')
//     }else{
//       for(var i=0;i<events.length;i++){
//         curr_event = events[i];
//         user.find
//       }
//     }
//   })
// });

//user verification route-> /users/verify/:email/:hash



//logout href -> /users/logout


module.exports = router;
