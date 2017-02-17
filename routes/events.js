var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  Events = require('../model/events'),
  Users = require('../model/user');

//event creation-only for admin page
router.get('/create/:event_id',function(req,res,next){
  var event = new Events({
    event_id : req.params.event_id
  });
  event.save(function(err){
    if(err) return console.log(err.stack);
    res.json(event);
  });
});

//event registration
router.get('/register/:event_id',function(req,res,next){
  var user = req.session.user;
  console.log(user);
  Events.findOneAndUpdate({event_id:req.params.event_id},{$addToSet: {users:user._id}},{new:true},function(err,foundevent){
    if(err) return console.log(err);
    if(!foundevent) return res.end("event not found");
    Users.update({_id:mongoose.Types.ObjectId(user._id)},{$addToSet:{events:req.params.event_id}},function(err){
      if(err) return console.log(err);
    });
    res.json(foundevent);
  });
});

//event unregistration 
router.get('/unregister/:event_id',function(req,res,next){

});


module.exports = router;
