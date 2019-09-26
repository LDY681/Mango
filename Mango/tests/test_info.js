var request = require("supertest");
var server = require("../app.js").listen(8000);
var assert = require("assert");

it('Test 1: check for response', function(done)
{
    request(server)
        .get("/")
        .expect(200)
        .end(done);
});
