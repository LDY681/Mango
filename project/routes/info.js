var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var response = {
    "tracking number":req.query.tracking_num,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});



module.exports = router;
