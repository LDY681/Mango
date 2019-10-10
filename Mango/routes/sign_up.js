var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../temp_front_files/sign_up.html'));
});

module.exports = router;