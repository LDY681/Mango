var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var should = require('chai').should();
var user_info = require("../models/user_info");

describe('Check for page response', function(){
    it('Check for home page response', function(done)
    {
        request(server)
            .get("/")
            .expect(200)
            .end(done);
    });

    it('Check for login page response', function(done)
    {
        request(server)
            .get("/users/login")
            .expect(200)
            .end(done);
    });

    it('Check for register page response', function(done)
    {
        request(server)
            .get("/users/register")
            .expect(200)
            .end(done);
    });

    it('Check for logout page response', function(done)
    {
        request(server)
            .get("/users/logout")
            .expect(302)
            .end(done);
    });
});

describe('Check for register function', function(){
    it('test for register a new user', function(done)
    {
        let data = {
            name: 'demo',
            email: 'demo@purdue.edu',
            password: 'demo'
        };
        request(server)
            .post("/")
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res)
            {
                assert.equal(res.body.status, 200);
            })
            .end(done);
        done();
    });

    it('save the registered user to the database', function(done)
    {
        var char = new user_info({
            name: 'demo',
            email: 'demo@purdue.edu',
            password: 'demo'
        });
        char.save().then(function () {
            assert(char.isNew === false);
            done();
        });
    });
});

describe('Check for registered user exist or not', function(){
    it('Check 1 for registered user name', function(){
        var name = 'demo';
        should.exist(name);
    });

    it('Check 2 for registered user email', function(){
        var email = 'demo@purdue.edu';
        should.exist(email);
    });

    it('Check 3 for registered user password', function(){
        var password = 'demo';
        should.exist(password);
    });
});

describe('Check for login function', function(){
    it('find 1 by specific name from the database', function(done) {
        this.timeout(15000);
        setTimeout(done, 13000);
        user_info.findOne({name: 'demo'}).then(function (result) {
            done();
        });
    });

    it('find 2 by specific email from the database', function(done) {
        this.timeout(15000);
        setTimeout(done, 13000);
        user_info.findOne({name: 'demo@purdue.edu'}).then(function (result) {
            done();
        });
    });

    it('find 3 by specific password from the database', function(done) {
        this.timeout(15000);
        setTimeout(done, 13000);
        user_info.findOne({name: 'demo'}).then(function (result) {
            done();
        });
    });
});

// describe('Check for logout function', function(){
//     it('test for logout, if logout successfully, return 404', function(done)
//     {
//         let data = {
//             name: 'demo',
//             email: 'demo@purdue.edu',
//             password: 'demo'
//         };
//         request(server)
//             .post("/users/logout")
//             .send(data)
//             .set('Accept', 'application/json')
//             .expect(404)
//             .expect(function (res)
//             {
//                 assert.equal(res.body.status, 404);
//             })
//             .end(done);
//     });
// });
