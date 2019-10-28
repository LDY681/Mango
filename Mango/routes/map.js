var express = require('express');
var router = express.Router();
var path = require('path');
const Info = require('../Tools/fetchData');


router.get('/', (req, res) => {

    //var result = readData.getName("wang1111@purdue.edu");
    //console.log("result: " + JSON.stringify(result));
    //console.log(readData.math());
    var obj = new Info(5);
    //obj.math(obj);
    //obj.getName("wang1111@purdue.edu", obj);
    //obj.test();
    //console.log(obj.name);
    

    console.log(obj.getName("wang1111@purdue.edu"));

    //res.sendFile(path.join(__dirname, '../temp_front_files/sign_up.html'));
    res.sendFile(path.join(__dirname, '../map/html/map.html'));
});


module.exports = router;