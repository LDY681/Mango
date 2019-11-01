var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test_info: check for map page response', function(done)
{
    request(server)
        .get("/map")
        .expect(200)
        .end(done);
});
