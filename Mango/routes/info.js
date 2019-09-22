var express = require('express');
var router = express.Router();
var trackingAPI = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path')

var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
var tracking_number = '9500115483499149486703';

var packageInfo;

function usps_callback(response) {
	packageInfo = response;
}


/* GET users listing. */
router.get('/',  async (req, res) => {
	var response = {
		"tracking number":req.query.tracking_num,
	};

	trackingAPI.trackUSPS(usps_username, tracking_number, usps_callback);

	// sleep 1 second, wait untail package data is fetched 
	await new Promise (resolve => {
		setTimeout(resolve, 1000)
	})

	console.log(packageInfo.TrackResponse.TrackInfo[0].$);
	res.end(JSON.stringify(packageInfo));
	//res.sendFile(path.join(__dirname, '../temp_front_files/info.html'))
});

module.exports = router;
