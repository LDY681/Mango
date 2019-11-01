var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test_info: check for response', function(done)
{
    request(server)
        .get("/")
        .expect(200)
        .end(done);
});

it('Test_info: check for info page response', function(done)
{
    request(server)
        .get("/info")
        .expect(200)
        .end(done);
});
