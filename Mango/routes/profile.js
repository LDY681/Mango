var express = require('express');
var router = express.Router();
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Package = require("../models/Package");

const mongoose = require("mongoose");
const db = "mongodb+srv://li2918:cs307@cluster0-kw4yb.mongodb.net/login-test?retryWrites=true&w=majority";

mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.on("error", function (error) {
    console.log("Fail to connect to mongoDB.", error);
});
mongoose.connection.on("open", function () {
    console.log("Connected to mongoDB!");
});


router.get('/', function (req, res){
    res.sendFile(path.join(__dirname, '../temp_front_files/profile.html'));
});

router.get('/',  function(req, res, next) {
    var response = {
        // add_package:req.query.add_package,
        // delete_package:req.query.delete_package
        tracking_number:req.query.tracking_number
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

//router.get('/test', (req, res) => res.render('profile'));
// var data = {hobbies:['abcdff', 'sddfsd','dfsdfdfs']};
// router.get('/package', function(req, res){
//     res.render('profile',{data:data});
// });



router.get('/package', (req, res) =>{
    const tracking_number = req.query.tracking_number;
    // const {tracking_number} = req.body;
    let errors = [];

    // info validation
    // check if values are blank
    // TESTING !!!!!!!
    // if (!tracking_number) {
    //     errors.push({ msg: 'Please fill in tracking number' });
    // }

    //if no errors
    if (errors.length > 0) {
        res.render('profile', {tracking_number:tracking_number});
    } else {

        Package.findOne({ tracking_number: tracking_number })  // check package
            .then(user => {
                if(user) {
                    // package has been added
                    //errors.push({ msg: 'Package is already added' });
                    res.render('profile', {tracking_number:tracking_number});
                } else {
                    const newPackage = new Package({
                        tracking_number
                    });

                    //save data
                    newPackage.save()
                        .then(user => {
                            req.flash("success_msg", "Your package are added.");
                            res.redirect('/profile');
                        })
                        .catch(err => console.log(err));
                }
            });
    }
});

module.exports = router;
