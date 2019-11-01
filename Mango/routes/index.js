var express = require('express');
var app = express();
var router = express.Router();
var trackingAPI = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

var usps_username = '328NOCOM1209';		// DO NOT CHANGE THIS
// var tracking_number = '9500115483499149486703';

var packageInfo;

function usps_callback(response) {
	packageInfo = response;
}



/* GET home page. */
router.get('/',  function(req, res, next) {
	res.sendFile(path.join(__dirname, '../temp_front_files/index.html'))
});

router.post('/track', async (req, res) => {
	console.log("json received: \n");
	console.log(req.body);
	//使用tracking_Num，通过tracking api求出tracking Info，然后将trackingInfo填进res.json里
	var tracking_number = req.body.trackNum;
	console.log("tracking_number is: " + tracking_number);
	trackingAPI.trackUSPS(usps_username, tracking_number, usps_callback);

	// sleep 1 second, wait until package data is fetched
	await new Promise (resolve => {
		setTimeout(resolve, 1000)
	});

	//console.log(packageInfo.TrackResponse.TrackInfo[0].$);
	//res.end(packageInfo);
	res.json(packageInfo);
});

router.post('/', function(req, res, next){
	var usps_username = req.body.usps_username;
	var tracking_number = req.body.tracking_number;
	console.log('usps_username: ', usps_username);
	console.log('tracking_number: ', tracking_number);
	console.log('body: ', req.body);
});

module.exports = router;
