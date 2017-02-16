var mongoose = require('mongoose');

var Events = new Schema({
  event_id:{type:Number},
  users: {type:[String]}
});

module.exports = mongoose.model('Events',Events);
