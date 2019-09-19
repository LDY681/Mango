var tracking = require('./TrackApi.js');

  var trackingID = '00000';
  var trackingSummary = '';
  var trackingHistory = '';
  var trackingFirstHistory = '';
  var res;

  // NO ERROR CHECK!
  // response is a JSON object
  function usps_callback(response) {

    // stringfy is as same as toString()
    //console.log(JSON.stringify(response));

    // print tracking number
	console.log("tracking number\n");
    console.log(response.TrackResponse.TrackInfo[0].$);
    trackingID = response.TrackResponse.TrackInfo[0].$

    // print summary
	console.log("summary\n");
    console.log(response.TrackResponse.TrackInfo[0].TrackSummary);
	trackingSummary = response.TrackResponse.TrackInfo[0].TrackSummary;

    // print whole tracking histry TrackDetail is a list of tracking history
	console.log("Track Detail\n");
    console.log(response.TrackResponse.TrackInfo[0].TrackDetail);
	trackingHistory = response.TrackResponse.TrackInfo[0].TrackDetail

    // print one tracking history
    // example: TrackDetail[0] prints first tracking history
	console.log("fisrt track detail\n");
    console.log(response.TrackResponse.TrackInfo[0].TrackDetail[0]);
	trackingFirstHistory = response.TrackResponse.TrackInfo[0].TrackDetail[0];
	res = {trackingID, trackingSummary, trackingHistory, trackingFirstHistory};
  }

  var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
  var tracking_number = '9500115483499149486703';

//tracking.trackUSPS(usps_username, tracking_number, usps_callback);


// function ups_callback(response) {
//   // print toString()
//   console.log(JSON.stringify(response));
// }


var ups_tracking_number = '1Z9YF1281326222692';

// Do NOT change these vars
var accessKey = 'CD6B1F9260161CF5';
var password = 'fuckUSPS!';
var ups_username = 'wang3695';

//tracking.trackUPS(ups_username, password, accessKey, ups_tracking_number, ups_callback);



function showInfo(id) {
  tracking.trackUSPS(usps_username, id, usps_callback);
  return res;
}


exports.showInfo = showInfo
exports.usps_callback = usps_callback
