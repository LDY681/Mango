const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

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
        User.findOne({ email: email })  // check email
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
                    const newUser = new User({
                        name,
                        email,
                        password
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


module.exports = router;