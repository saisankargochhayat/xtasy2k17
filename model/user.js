var mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');
SALT_WORK_FACTOR = 10;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    events: {
        type: [String]
    },
    accomodation:{
        type:String,
        required : true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    verification_hash: {
      type: String
    }
    // basearea : {type:String,required:true},
    // conquered : Array,
    // score : {type:Number , required:true}
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'xtasyId',
    startAt: 1000,
    incrementBy: 1
});



userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
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
