var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    //var usps_username = req.body.usps_username;
    var tracking_number = req.body.tracking_number;

    var id_vali = 1;
    if(tracking_number.length < 20){
        id_vali = -1;
    }
    else if(tracking_number.length > 25){
        id_vali = -1;
    }
    else if(tracking_number.search(/[a-z]/) > 0){
        id_vali = -1;
    }
    else if(tracking_number.search(/[A-Z]/) > 0){
        id_vali = -1;
    }
    else if (tracking_number.search(/[0-9]/) < 0) {
        id_vali = -1;
    }

    if (id_vali === -1){
        //tracking_number is invalid
        res.json({"status": 201,
            "err_message": "invalid tracking_number"});
        var err_message = req.body.err_message;
        console.log('err_message: ', err_message);

    }
});

module.exports = router;