var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Events = new Schema({
  name:{type:String},
  event_id:{type:Number},
  users: {type:[String]}
});

module.exports = mongoose.model('Events',Events);
