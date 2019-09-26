var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test 1: check for response', function(done)
{
    request(server)
        .get("/")
        .expect(200)
        .end(done);
});
