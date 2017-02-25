var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mailer = require('node-mailer');
var user = require('../model/user');
var events = require('../model/events');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin');
});


router.get('/users', function(req, res, next) {
    user.find({}, function (err, users) {
        if(err){
          console.log(err);
          res.render('admin');
        }
        else {
          res.render('admin',{"users": users});
        }
    });
});

router.get('/events/:event_id', function(req, res, next) {
    events.find({event_id: req.params.event_id}, function (err, event_data) {
        if(err){
          console.log(err);
          res.render('admin');
        }
        else {
          res.render('admin',{"event_data": event_data});
        }
    });
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
