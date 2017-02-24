var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  Events = require('../model/events'),
  Users = require('../model/user');

//get the event document -> /events/:event_id
var authenticate = function(req,res,next){
  if(req.session){
    if(req.session.user){
      next()
    }else{
      res.send("Please Login to register for event")
    }
  }else{
    res.send("Please Login to register for event")
  }
}
router.get('/:event_id',authenticate,function(req,res,next){
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
router.get('/register/:event_id',authenticate,function(req,res,next){
  var user = req.session.user;
  console.log(user);
  Events.findOneAndUpdate({event_id:req.params.event_id},{$addToSet: {users:user._id}},{new:true},function(err,foundevent){
    if(err){
       console.log(err);
       res.send("There was some Problem with the Registration. Please try again later")
    }
    if(!foundevent) return res.send("Event not found");
    Users.findOneAndUpdate({_id:mongoose.Types.ObjectId(user._id)},{$addToSet:{events:req.params.event_id}},{new:true},function(err,foundUser){
      if(err) return console.log(err);
      console.log(foundUser);
    });
    res.send("Succesfully Registered for the event")
  });
});

//event unregistration -> /events/unregister/:event_id
router.get('/unregister/:event_id',authenticate,function(req,res,next){
  var user = req.session.user;
  console.log(user);
  Events.findOneAndUpdate({event_id:req.params.event_id},{$pull:{users:user._id}},{new:true},function(err,foundevent){
    if(err){
       console.log(err);
       res.send("There was some Problem with the Registration. Please try again later")
    }
    if(!foundevent) return res.end("Event not found");
    Users.update({_id:mongoose.Types.ObjectId(user._id)},{$pull:{events:req.params.event_id}},function(err){
      if(err) return console.log(err);
    });
    res.send("Succesfully Unregistered for the event")
  });
});


module.exports = router;
