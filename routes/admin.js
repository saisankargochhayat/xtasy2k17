var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mailer = require('node-mailer');
var user = require('../model/user');
var events = require('../model/events');
var event_dict = {
  '1':"Prove Ur Move",
  '2':"Salsa Workshop",
  '3':"The Dancing Feat",
  '4':"Burnout",
  '5':"The Chosen One",
  '6':"Kalamanch",
  '7':"Pukaar",
  '8': "Goonj",
  '9': "Karaoke",
  '10': "War of Bands",
  '11': "Sp-ent and India Quiz",
  '12': "Broadcast",
  '13': "I-Kavi",
  '14': "Terribly Tiny Tales",
  '15': "Amit Mishra Live",
  '16': "Zephyrtone Live",
}
var authenticate = function(req,res,next){
  console.log("Trying to authenticate");
  console.log(req.session);
  if(req.session){
    if(req.session.admin){
      next()
    }else{
      res.redirect('/admin/admin_signin')
    }
  }else{
      res.redirect('/admin/admin_signin')
  }
}
/* GET users listing. */
router.get('/admin_signin',function(req,res,next){
  res.render('admin-signin')
})
router.get('/admin_signout',function(req,res,next){
  res.session.admin=false
  res.render('admin-signin')
})
router.post('/admin_signin',function(req,res,next){
  if(typeof req.body.password != 'undefined'){
    if(req.body.password == 'admin@xtasy2017'){
      res.session = {}
      req.session.admin = true
      res.redirect('/admin')
    }else{
      res.send("incorrect password")
    }
  }else{
    res.send("Please send Password")
  }
});
router.get('/',authenticate,function(req, res, next) {
  user.find({'is_verified':true}, function (err, users) {
      if(err){
        console.log(err);
        res.render('admin');
      }
      else {
        var render_data = {
          'users' : users,
          'event_dict':event_dict
        }
        res.render('admin',render_data);
      }
  });
});


router.get('/events/:event_id',function(req, res, next) {
    user.find({events:req.params.event_id},function(err,user_data){
      if(err){
        console.log(err);
        res.render('admin')
      }else{
        render_data = {
                'event' : req.params.event_id,
                'user_list':user_data,
                'event_dict' : event_dict
              }
              console.log(render_data);
              res.render('admin-event',render_data);
      }
    })
    // events.findOne({event_id: req.params.event_id},function (err, event_data) {
    //     if(err){
    //       console.log(err);
    //       res.render('admin');
    //     }
    //     else {
    //       render_data = {
    //         'event' : event_data,
    //         'event_dict' : event_dict
    //       }
    //       res.render('admin-event',render_data);
    //     }
    // });
});


module.exports = router;
