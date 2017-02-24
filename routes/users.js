var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var mailer = require('node-mailer');
var nodemailer = require('nodemailer')
var user = require('../model/user');
var md5 = require('md5');
var validator = require('email-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//register form action/url -> /users/register
router.post('/register', function(req, res, next) {
    // console.log(validator.validate(req.body.email));
    console.log(req.body.email);
    if((!req.body.email)||(!req.body.name)||(!req.body.password)
      ||(!req.body.college)||(!req.body.year)||(!req.body))
      return res.redirect('/?msg=invalid signup');

    if(!validator.validate(req.body.email))
      return res.redirect('/?msg=invalid email address');

    var newUser = new user({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        college: req.body.college,
        year: req.body.year,
        phone: req.body.phone,
        gender: req.body.gender,
        verification_hash: md5(req.body.email+(Math.random()*(1000-1)+1000))
    });
    console.log("here");

    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'rishav.159@gmail.com',
        pass:'yvzieleknhnjyusu'
      }
    });
    console.log("here");


    var mailOptions = {
      from : "rishav.159@gmail.com",
      to : newUser.email,
      subject : "Account verification for XTASY 2k17",
      html : 'Thank you for registering in Xtasy, the annual Cultural Fest of CET, Bhubaneswar. Verify your account by clicking <a href="http://localhost:3000/users/verify/'+newUser.email+'/'+newUser.verification_hash+'">here.</a>'
    }

    console.log("here");
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        return console.log(error);
      }else{
        console.log(info);
      }
    })

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
        }else{
          req.session.user = newUser;
          console.log(newUser);
          res.redirect('/')
        }
    });
});

//user verification route-> /users/verify/:email/:hash
router.get('/verify/:email/:hash', function(req, res, next) {
    user.findOne({
        email:req.params.email
    }, function(err, foundUser) {
        if (err) return console.log(err);
        if (foundUser.is_verified == true) return res.send('Account already verified!');
        if(foundUser.is_verified != true&&foundUser.verification_hash==req.params.hash){
          foundUser.is_verified = true;
          foundUser.save(function(err) {
              if (err) return console.log(err);
              req.session.user = foundUser;
              console.log(foundUser);
              res.redirect('/')
          });
        }
        else return res.send('incorrect hash');
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
                console.log(foundUser);
                res.redirect('/')
            } else {
                foundUser = {}
                res.send(foundUser);
            }
        });
    });
});

module.exports = router;
