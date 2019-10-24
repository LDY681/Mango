var express = require('express');
var app = express();
var router = express.Router();
var tracking = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path');


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
router.get('/', function(req, res, next) {
	// tracking.trackUSPS(usps_username, tracking_number, usps_callback)
	// console.log(response.TrackResponse.TrackInfo[0].$);
	//res.render('index', { title: result });

	res.sendFile(path.join(__dirname, '../temp_front_files/index.html'))
});

router.post('/track', function(req, res){
    //console.log("tracking_Num is: " + req.body.trackNum);

    //使用tracking_Num，通过tracking api求出tracking Info，然后将trackingInfo填进res.json里
	res.json({ usps_username: 'liudayu',tracking_number: 'test123'});
});

module.exports = router;
