var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/xtasy');
var Events = new Schema({
  event_id:{type:Number},
  users: {type:[String]}
});

module.exports = mongoose.model('Events',Events);
