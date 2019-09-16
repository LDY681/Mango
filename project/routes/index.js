var express = require('express');
var router = express.Router();
var tracking = require('../packageInfo/TrackApi.js');


var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
var tracking_number = '9500115483499149486703';

function usps_callback(response) {
  res.send(JSON.stringify(response));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  tracking.trackUSPS(usps_username, tracking_number, usps_callback)
  //res.render('index', { title: 'Ex' });
});

module.exports = router;
