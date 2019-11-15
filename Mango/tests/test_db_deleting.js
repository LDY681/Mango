var request = require("supertest");
var server = require("../app.js");
var assert = require("assert");
var Package = require("../models/Package");

describe('Deleting records', function(){
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

    it('Test 4: delete one record from the database', function(done) {
        Package.findOneAndRemove({tracking_number: '9500119500115483000'}).then(function () {
            Package.findOne({tracking_number: '9500119500115483000'}).then(function (result) {
                done();
            })
        })
    });

    it('Should delete record', async () => {
        const recordToDelete = await Package.findOneAndRemove({_id: char._id});
        const foundRecord = await Package.findOne({_id: recordToDelete._id.toString()});
        assert(foundRecord === null);
    });
});
