const express = require("express");
const router = express.Router();

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

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        console.log(req.body);
        res.send("hello");
    }
});


module.exports = router;