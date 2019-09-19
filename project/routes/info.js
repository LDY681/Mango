var express = require('express');
var app = express();
var router = express.Router();
var trackingAPI = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path')

var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
var tracking_number = '9500115483499149486703';

function usps_callback(response) {
	console.log(response.TrackResponse.TrackInfo[0].$);
	return response.TrackResponse.TrackInfo[0].$;
}

// var displayInfo = function (req, res, next) {
// 	var result = tool.showInfo();
// 	req.query.info = result;
// 	next();
// }
//
// router.use(displayInfo);

/* GET users listing. */
router.get('/',  async (req, res) => {
	var response = {
		"tracking number":req.query.tracking_num,
	};
	// console.log("Printing response for " + req.query.tracking_num + "\n=============================\n");
	// console.log("printing showInfo\n");
	// console.log(res);
	//console.log("showinfo finished\n");
	//res.sendFile(path.join(__dirname, '../temp_front_files/info.html'))


	const result =  trackingAPI.trackUSPS(usps_username, tracking_number, usps_callback);
	//console.log(result.TrackResponse.TrackInfo[0].$);

	// sleep 1 second, wait untail package data is fetched 
	await new Promise (resolve => {
		setTimeout(resolve, 1000)
	  })
	//res.end(JSON.stringify(response));
	res.sendFile(path.join(__dirname, '../temp_front_files/info.html'))
	//res.end(JSON.stringify(trackingAPI.trackUSPS(usps_username, tracking_number, usps_callback)));
});



module.exports = router;
