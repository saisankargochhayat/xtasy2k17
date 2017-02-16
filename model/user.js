var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/xtasy');

var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');
SALT_WORK_FACTOR = 10;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

  var userSchema = mongoose.Schema({
    name:{type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    college:{type:String, required:true},
    year:{type:String, required:true},
    phone:{type:String, required:true},
    gender:{type:String, required:true},
    is_verified:{type:Boolean}
    // basearea : {type:String,required:true},
    // conquered : Array,
    // score : {type:Number , required:true}
  });

  userSchema.pre('save', function(next) {
      var user = this;

      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')) return next();

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password along with our new salt
          bcrypt.hash(user.password, salt,null, function(err, hash) {
              if (err) return next(err);

              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
      });
  });

  userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };

module.exports = mongoose.model('User', userSchema);
