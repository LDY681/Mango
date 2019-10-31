const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const user_info = require("../models/user_info");


const mongoose = require("mongoose");
const db = "mongodb+srv://li2918:cs307@cluster0-kw4yb.mongodb.net/login-test?retryWrites=true&w=majority";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cs408.delivery@gmail.com',
    pass: 'cs408track'
  }
});


mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.on("error", function (error) {
  console.log("Fail to connect to mongoDB.", error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to mongoDB!");
});




// login
router.get('/login', (req, res) => res.render("login"));

// Register
router.get('/register', (req, res) => res.render("register"));

// Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    // info validation
    // check if values are blank
    // TESTING !!!!!!!
    if (!name) {
        errors.push({ msg: 'Please fill in name' });
    }
    if (!email) {
        errors.push({ msg: 'Please fill in email' });
    }
    if (!password) {
        errors.push({ msg: 'Please fill in password' });
    }
    if (!password2) {
        errors.push({ msg: 'Please fill in confirm password' });
    }

    // check if password match
    if (password != password2) {
        errors.push({ msg: 'Please enters same password' });
    }

    // if no errors
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        user_info.findOne({ email: email })  // check email
            .then(user => {
                if(user) {
                    // email has been used
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new user_info({
                        name,
                        email,
                        password
                    });

                    var mailOptions = {
                        from: 'cs408.delivery@gmail.com',
                        to: email,
                        subject: 'Register sucessfully',
                        text: 'You have registered sucessfully.'
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // update password to hashed password
                            newUser.password = hash;

                            //save data
                            newUser.save()
                                .then(user => {
                                    req.flash("success_msg", "You are now registered and can login.");
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }));
                }
            });
    }
});


// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      //successRedirect: '/users/register',
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });


  // Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;