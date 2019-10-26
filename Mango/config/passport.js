const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');

// using passport module
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            // see if there is a email in database that matchs current email
            User.findOne({ email: email })
                .then(user => { // return a user
                    if (!user) {   // if no user matchs
                        return done(null, false, { message: "That email is not registered." }); 
                    }

                    // Match entered password with database password
                    // using bcrypt to compare hashed password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err; // things went wrong

                        if (isMatch) {  // passwords match
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Password is incorrect" });
                        }
                    });
                })
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};