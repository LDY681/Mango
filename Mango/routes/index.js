var express = require('express');
var app = express();
var router = express.Router();
var tracking = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

var usps_username = '328NOCOM1209';		// DO NOT CHANGE THIS
var tracking_number = '9500115483499149486703';

var result = 'exxx';

function usps_callback(response) {
	result = JSON.stringify(response);
	//res.send(JSON.stringify(response));
	//res.render('index', { title: 'www' });
}

var myLogger = function (req, res, next) {
	result = tool.showInfo();
	next()
};

// router.use(myLogger)

/* GET home page. */
router.get('/',  function(req, res, next) {
//router.get('/', ensureAuthenticated, function(req, res, next) {
	// tracking.trackUSPS(usps_username, tracking_number, usps_callback)
	// console.log(response.TrackResponse.TrackInfo[0].$);
	//res.render('index', { title: result });

	res.sendFile(path.join(__dirname, '../temp_front_files/index.html'))
});

router.get('/track', function(req, res){
/*    console.log("json received: \n");
    console.log(req.body);*/
    //使用tracking_Num，通过tracking api求出tracking Info，然后将trackingInfo填进res.json里
    res.json({ "usps_username": "liudayu","tracking_number": "test123"});
});

router.post('/', function(req, res, next){
    	var usps_username = req.body.usps_username;
        var tracking_number = req.body.tracking_number;
        console.log('usps_username: ', usps_username);
        console.log('tracking_number: ', tracking_number);
        console.log('body: ', req.body);
});

module.exports = router;
