var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', (req, res) => {

    //res.sendFile(path.join(__dirname, '../temp_front_files/sign_up.html'));
    res.sendFile(path.join(__dirname, '../map/html/map.html'));
});


module.exports = router;