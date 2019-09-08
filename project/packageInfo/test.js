var tracking = require('./TrackApi.js');


  // NO ERROR CHECK!
  // response is a JSON object
  function usps_callback(response) {

    // stringfy is as same as toString()
    console.log(JSON.stringify(response));

    // print tracking number
    console.log(response.TrackResponse.TrackInfo[0].$);


    // print summary
    console.log(response.TrackResponse.TrackInfo[0].TrackSummary);

    // print whole tracking histry TrackDetail is a list of tracking history
    console.log(response.TrackResponse.TrackInfo[0].TrackDetail);

    // print one tracking history
    // example: TrackDetail[0] prints first tracking history
    console.log(response.TrackResponse.TrackInfo[0].TrackDetail[0]);
  }

  var usps_username = '328NOCOM1209';     // DO NOT CHANGE THIS
  var tracking_number = '9500115483499149486703';

//tracking.trackUSPS(usps_username, tracking_number, usps_callback);


function ups_callback(response) {
  // print toString()
  console.log(JSON.stringify(response));
}


var ups_tracking_number = '1Z9YF1281326222692';

// Do NOT change these vars 
var accessKey = 'CD6B1F9260161CF5';
var password = 'fuckUSPS!';
var ups_username = 'wang3695';

tracking.trackUPS(ups_username, password, accessKey, ups_tracking_number, ups_callback);


