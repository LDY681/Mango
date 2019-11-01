var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var server = require("../app.js");

it('checking for null', function(){
    var id = null;
    should.not.exist(id);
});

it('checking for usps_username', function(){
    var usps_username = '328NOCOM1209';
    should.exist(usps_username);
});

it('checking for tracking_number', function(){
    var tracking_number = '9500115483499149486703';
    should.exist(tracking_number);
});
