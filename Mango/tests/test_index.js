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

it('Test 2: should return 200 with correct username and tracking number', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '9500115483499149486703'
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

it('Test 3: should return {missing} with missing username', function(done)
{
    let data = {
        tracking_number: '9500115483499149486703'
    };
    request(server)
        .post("/")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
    done();
});

it('Test 4: should return 201 with missing tracking number', function(done)
{
    let data = {
        usps_username: '328NOCOM1209'
    };
    request(server)
        .post("/")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
    done();
});