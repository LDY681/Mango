var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test Profile 1: check for profile page response', function(done)
{
    request(server)
        .get("/profile")
        .expect(200)
        .end(done);
});

it('Test Profile 2: check for package page response', function(done)
{
    request(server)
        .get("/profile/package")
        .expect(302)
        .end(done);
});

