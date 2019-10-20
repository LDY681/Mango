var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");

it('Test 1: invalid tracking number when length = 19 < 20 (Boundary)', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '9500119500115483499'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 2: invalid tracking number when length = 26 > 25 (Boundary)', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '95001195001154834991494866'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 3: invalid tracking number when it has lowercase', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: 'abc9500115483499149486703'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 4: invalid tracking number when it has uppercase', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: 'ABC9500115483499149486703'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 5: invalid tracking number when it has special characters', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '9500115483499149486703!!'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 6: invalid tracking number when it only has lowercase letters', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: 'aaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 7: invalid tracking number when it only has uppercase letters', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: 'AAAAAAAAAAAAAAAAAAAAAA'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 8: invalid tracking number when it only has special characters', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: '?=.*?[#?!@$%^&*-?=.*?[#?'
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

// it('Test 9: invalid tracking number when it does not have numbers', function(done)
// {
//     let data = {
//         usps_username: '328NOCOM1209',
//         tracking_number: '?=.*GGGGGGGGGGGGGGGGGG'
//     };
//     request(server)
//         .post("/veri")
//         .send(data)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function (res)
//         {
//             assert.equal(res.body.status, 201);
//         })
//         .end(done);
// });

it('Test 9: invalid tracking number when there is no input', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: ''
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});

it('Test 10: invalid tracking number when input in null', function(done)
{
    let data = {
        usps_username: '328NOCOM1209',
        tracking_number: ' '
    };
    request(server)
        .post("/veri")
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res)
        {
            assert.equal(res.body.status, 201);
        })
        .end(done);
});
