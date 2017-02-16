var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  Events = require('../model/events');

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
  Events.update({event_id:req.params.event_id},{$addToSet: {users:user._id}},function(err){
    if(err) return console.log(err);
  });
  Events.findOne({event_id:req.params.event_id},function(err,foundevent){
    if(err) return console.log(err);
    res.json(foundevent);
  });
});

module.exports = router;
