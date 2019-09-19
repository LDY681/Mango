var express = require('express');
var app = express();
var router = express.Router();
var tracking = require('../packageInfo/TrackApi.js');
var tool = require('../packageInfo/test.js');
var path = require('path')


// var displayInfo = function (req, res, next) {
// 	var result = tool.showInfo();
// 	req.query.info = result;
// 	next();
// }
//
// router.use(displayInfo);

/* GET users listing. */
router.get('/', function(req, res, next) {
	var response = {
		"tracking number":req.query.tracking_num,
	};
	console.log("Printing response for " + req.query.tracking_num + "\n=============================\n");
	console.log("printing showInfo\n");
	// var res = tool.showInfo("9500115483499149486703");
	// console.log(res);
	console.log("showinfo finished\n");
	res.sendFile(path.join(__dirname, '../temp_front_files/info.html'))
	// res.end(JSON.stringify(response));
});



module.exports = router;
