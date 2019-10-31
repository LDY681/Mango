var express = require('express');
var router = express.Router();
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', function (req, res){
    res.sendFile(path.join(__dirname, '../temp_front_files/profile.html'));
});

router.get('/',  function(req, res, next) {
    var response = {
        add_package:req.query.add_package,
        delete_package:req.query.delete_package
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

//router.get('/test', (req, res) => res.render('profile'));
var data = {hobbies:['abcdff', 'sddfsd','dfsdfdfs']};
router.get('/package', function(req, res){
    res.render('profile',{data:data});
});

module.exports = router;
