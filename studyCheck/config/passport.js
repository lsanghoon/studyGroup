var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  new User({ id: id}).fetch().then(function(user) {
    done(null, user);
  });
});

// Sign in with Email and Password
passport.use(new LocalStrategy({ 
  usernameField: 'uName',
  passwordField: 'uName'
}, function(username, password, done) {
//  new User({ uName: username })
//    .fetch()
//    .then(function(user) {
//      if (!user) {
//        return done(null, false, { msg: 'The email address ' + uName + ' is not associated with any account. ' +
//        'Double-check your email address and try again.' });
//      }
//      user.comparePassword(uName, function(err, isMatch) {
//        if (!isMatch) {
//          console.log("passport.js comparePassword 에서 !isMatch")
//          return done(null, false, {msg: 'Invalid uName'});
//        }
//        return done(null, user);
//      });
//    });
  User.findOne({ username : username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null,false,{message:'incorrect name'});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'incoorect name2'});
    }
    return done (null, user);
  })
}));
