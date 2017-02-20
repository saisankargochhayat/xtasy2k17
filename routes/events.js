var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  Events = require('../model/events'),
  Users = require('../model/user');

//get the event document -> /events/:event_id
router.get('/:event_id',function(req,res,next){
    Events.findOne({event_id:req.params.event_id},function(err,foundEvent){
      if(err) return console.log(err);
      if(!foundEvent) return res.end("event not found");
      res.json(foundEvent);
    });
});

//event creation-only for admin page -> /events/create/:event_id
router.post('/create',function(req,res,next){
  var event = new Events({
    name: req.body.name,
    event_id : req.body.event_id
  });
  event.save(function(err){
    if(err) return console.log(err.stack);
    res.json(event);
  });
});

//event registration -> /events/register/:event_id
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

//event unregistration -> /events/unregister/:event_id
router.get('/unregister/:event_id',function(req,res,next){
  var user = req.session.user;
  console.log(user);
  Events.findOneAndUpdate({event_id:req.params.event_id},{$pull:{users:user._id}},{new:true},function(err,foundevent){
    if(err) return console.log(err);
    if(!foundevent) return res.end("event not found");
    Users.update({_id:mongoose.Types.ObjectId(user._id)},{$pull:{events:req.params.event_id}},function(err){
      if(err) return console.log(err);
    });
    res.json(foundevent);
  });
});


module.exports = router;
