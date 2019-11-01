var express = require('express');
var router = express.Router();
var trackingAPI = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path');

var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
var tracking_number = '';


var packageInfo;

function usps_callback(response) {
	packageInfo = response;
}

/* GET users listing. */
router.get('/',  async (req, res) => {
	var response = {
		"tracking number":req.query.tracking_num,
	};
	tracking_number = req.query.tracking_num;
	console.log("response");
	console.log(response);

	trackingAPI.trackUSPS(usps_username, tracking_number, usps_callback);

	// sleep 1 second, wait untail package data is fetched
	await new Promise (resolve => {
		setTimeout(resolve, 1000)
	});
	//printing tracking number
	console.log();
	console.log("printing tracking id from info.js");
	console.log(packageInfo.TrackResponse.TrackInfo[0].$);
	console.log();
	console.log("printing packageinfo");
	console.log(JSON.stringify(packageInfo));
	console.log();
	//printing tracking info and do not render info.html
	// res.end(JSON.stringify(packageInfo));
	res.sendFile(path.join(__dirname, '../temp_front_files/info.html'))
});

module.exports = router;
