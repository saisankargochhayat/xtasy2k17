var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Events = new Schema({
  event_id:{type:Number},
  users: {type:[String]}
});

module.exports = mongoose.model('Events',Events);
