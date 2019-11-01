var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test_signup: check for response', function(done)
{
    request(server)
        .get("/")
        .expect(200)
        .end(done);
});

it('Test_signup: check for login page response', function(done)
{
    request(server)
        .get("/users/login")
        .expect(200)
        .end(done);
});

it('Test_signup: check for register page response', function(done)
{
    request(server)
        .get("/users/register")
        .expect(200)
        .end(done);
});

it('Test_signup: check for logout page response', function(done)
{
    request(server)
        .get("/users/logout")
        .expect(302)
        .end(done);
});

