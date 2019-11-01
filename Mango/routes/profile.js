var express = require('express');
var router = express.Router();
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require("passport");

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


// find data from database
function find (name, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
        collection.find().toArray(cb);
    });
}


router.get('/', function (req, res){
    var tracking_numbers;

    find('packages',  function (err, data) {
        tracking_numbers = data;
        console.dir(data);
    });


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



router.get('/delete', (req, res) =>{
    var tracking_number = req.query.tracking_number;
    Package.deleteOne({tracking_number:tracking_number}, (err, package) =>{
        if (err){
            res.status(500).send(err)
        }
        else {
            res.render("delete", {key: tracking_number});
            //res.status(200).send(tracking_number + ' was deleted')
        }
    })
});

router.get('/package', (req, res) =>{
    var tracking_number = req.query.tracking_number;
    Package.findOne({tracking_number:tracking_number}, (package) =>{
        if (package){
            res.status(500).send(tracking_number + ' was already added');
            res.redirect('/profile');
        }
        else {
            const newPackage = new Package({
                tracking_number
            });

            //save data
            newPackage.save()
                .then(user => {
                    //res.status(200).send(tracking_number + ' was added');
                    res.render('add', {key: tracking_number});
                    //req.flash("success_msg", "Your package are added.");
                    passport.authenticate('local', {
                        //successRedirect: '/users/register',
                        successRedirect: '/profile',
                        failureRedirect: '/profile/package',
                        failureFlash: true
                    })(req, res, next);
                })
                .catch(err => console.log(err));
        }
    })
});



module.exports = router;
