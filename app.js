var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events')

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    cookieName:'session',
    secret:'random_string',
    duration:30*60*1000,
    activeDuration:5*60*1000
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/events',events)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'rishav.159@gmail.com',
    pass:'yvzieleknhnjyusu'
  }
})
var mailOptions = {
  from : "rishav.159@gmail.com",
  to : "rishav.159@gmail.com",
  subject : "Sample Mail",
  text : "Mehasfasf",
  html : "Df"
}
// transporter.sendMail(mailOptions,function(error,info){
//   if(error){
//     return console.log(error);
//   }else{
//     console.log(info);
//   }
// })
// send({
//   subject: 'attached '           // String or array of strings of filenames to attach
// }, function (err, res) {
//   console.log('* [example1] send(): err:', err, '; res:', res);
// });
module.exports = app;
