var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Events = new Schema({
  name:{type:String},
  event_id:{type:Number},
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('Events',Events);
