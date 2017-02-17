var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mailer = require('node-mailer');
var user = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//register form action/url -> /users/register
router.post('/register', function(req, res, next) {
    console.log(req.body);
    var newUser = new user({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        college: req.body.college,
        year: req.body.year,
        phone: req.body.phone,
        gender: req.body.gender
    });

    // new mailer.Mail({
    //    from: 'noreply@domain.com',
    //    to: newUser.email,
    //    subject: 'Account verification for XTASY 2k17',
    //    body: 'verify your account by visiting http://localhosl:3000/user/verify/id',
    //    callback: function(err, data){
    // 	  console.log(err);
    // 	  console.log(data);
    //    }
    // });

    newUser.save(function(err) {
        if (err) {
            return console.log(err.stack);
        }
        req.session.user = newUser;
        res.json(newUser);
    });
});

//user verification route-> /users/verify/:id
router.get('/verify/:id', function(req, res, next) {
    user.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, function(err, foundUser) {
        if (err) return console.log(err);
        if (foundUser.is_verified == true) return res.send('Account already verified!');
        foundUser.is_verified = true;
        foundUser.save(function(err) {
            if (err) return console.log(err);
            req.session.user = foundUser;
            res.json(foundUser);
        });
    });
});


//logout href -> /users/logout
router.get('/logout', function(req, res, next) {
    req.session.reset();
    res.redirect('/');
});


//login form action/url -> /users/login
router.post('/login', function(req, res, next) {
    user.findOne({
        email: req.body.login_email
    }, function(err, foundUser) {
        if (err) {
            return console.log(err);
        }
        if (!foundUser) {
            return res.json({});
        }
        // test a matching password
        foundUser.comparePassword(req.body.login_password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                req.session.user = foundUser;
                console.log(req.session.user._id + " is the user id");
                console.log(req.session.user.name+ " is the User");
                res.json(foundUser);
            } else {
                foundUser = {}
                res.send(foundUser);
            }
        });
    });
});

module.exports = router;
