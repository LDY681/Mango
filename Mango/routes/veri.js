var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    //var usps_username = req.body.usps_username;
    var tracking_number = req.body.tracking_number;
    var err_message = "";

    var id_vali = 1;
    if(tracking_number.length < 20){
        id_vali = -1;
        err_message = "(invalid) tracking number length < 20";
    }
    else if(tracking_number.length > 25){
        id_vali = -1;
        err_message = "(invalid) tracking number length > 25";
    }
    else if (tracking_number.match(/[a-z]/)){
        if(tracking_number.match(/^[a-z]+$/)){
            id_vali = -1;
            err_message = "(invalid) tracking number only has lowercase letters";
        }
        else{
            id_vali = -1;
            err_message = "(invalid) tracking number has lowercase letters";
        }
    }
    else if(tracking_number.match(/[A-Z]/)){
        if(tracking_number.match(/^[A-Z]+$/)){
            id_vali = -1;
            err_message = "(invalid) tracking number only has uppercase letters";
        }
        else{
            id_vali = -1;
            err_message = "(invalid) tracking number has uppercase letters";
        }
    }
    else if(tracking_number.match(/[?=.*?[#?!@$%^&*-]/)){
        if(tracking_number.match(/^[?=.*?[#?!@$%^&*-]+$/)){
            id_vali = -1;
            err_message = "(invalid) tracking number only has uppercase letters";
        }
        else{
            id_vali = -1;
            err_message = "(invalid) tracking number has special characters";
        }
    }
    else if (!tracking_number.match(/^[0-9]+$/)) {
        id_vali = -1;
        err_message = "(invalid) tracking number does not have numbers";
    }


    if (id_vali === -1){
        //tracking_number is invalid
        res.json({"status": 201,
            "err_message": "invalid tracking_number"});
        //var err_message = req.body.err_message;
        console.log('err_message: ', err_message);

    }
});

module.exports = router;
