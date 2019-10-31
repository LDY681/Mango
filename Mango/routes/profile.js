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
    var tracking_number = req.query.tracking_number;

    // check database, see if there is a package has the same tracking number
    Package.findOne({ tracking_number: tracking_number })  // check package
        .then(package => {  
            if(package) {   // there is a same tracking number
                // package has been added
                res.render('profile', {tracking_number:tracking_number});
            } else {        // no same tracking number in database
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
});

module.exports = router;
