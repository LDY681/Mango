var request = require("supertest");
var server = require("../app.js").listen(8000);
var assert = require("assert");
//var trackingAPI = require('../packageInfo/TrackApi.js');

it('should return 200 with correct tracking number', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '9500115483499149486703'
    };
    request(server)
        .post("/")
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 200);
        })
        .end(done);
});
