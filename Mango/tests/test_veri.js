var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test 1: invalid tracking number when length < 20', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '9500115483'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(function (res)
        {
            assert.equal(res.status, 201);
        })
        .end(done);
    done();
});