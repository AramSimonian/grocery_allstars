var express = require('express');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require("passport-local");


var User = require('./models/user');

var index = require('./controllers/index');
var products = require('./controllers/products');
var users = require('./controllers/users');
var dashboard = require('./controllers/dashboard');
var scans = require('./controllers/scans');
var auth = require('./controllers/auth');
var apiService = require('./controllers/apiService');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var engine = require('ejs-layout');
app.set('view engine', 'ejs');
app.engine('ejs', engine.__express);

require('./config/passport/passport.js')(passport, User);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//serialize
passport.serializeUser(function(user, done) {

    done(null, user.id);

});

// deserialize user
passport.deserializeUser(function(id, done) {
    User.where({ id: id }).fetch().then(function(user) {

        if (user) {
            done(null, user);
        } else {
            done(user.errors, null);
        }
    });
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);
app.use('/scans', scans);
app.use('/products', products);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/auth', auth);
app.use('/apiservice', apiService);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
