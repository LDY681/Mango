var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var Package = require("../models/Package");

describe('Saving records', function(){
    it('save a record to the database', function(done)
    {
        var char = new Package({
            tracking_number: '9500119500115483000'
        });
        char.save().then(function () {
            assert(char.isNew === false);
            done();
        });
    });
});
