var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var Package = require("../models/Package");

describe('Finding records', function(){
    var char;

    beforeEach(function(done){
        char = new Package({
            tracking_number: '9500119500115483000'
        });
        char.save().then(function() {
            assert(char.isNew === false);
            done();
        });
    });

    it('find one record by specific tracking number from the database', function(done) {
        this.timeout(15000);
        setTimeout(done, 13000);
        Package.findOne({tracking_number: '9500119500115483000'}).then(function (result) {
           // assert(result.tracking_number==='9500119500115483000');
            done();
        });
    });

    it('find one record by ID from the database', function(done) {
        Package.findOne({_id:char._id}).then(function (result) {
            assert(result._id.toString() === char._id.toString());
            done();
        });
    });
});
