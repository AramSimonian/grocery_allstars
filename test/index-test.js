var app = require('../app.js');
var morgan = require('morgan');
bodyParser = require('body-parser');
var Browser = require('zombie');
var assert = require('assert');
var http = require('http');


describe('Index page', function() {

  before(function() {
    this.server = http.createServer(app).listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({
      site: 'http://localhost:3000'
    });
  });

  // load the contact page
  before(function(done) {
    this.browser.visit('/', done);
  });

  describe('Get', function() {

    it('should display page', function() {
      assert.ok(this.browser.success);
    });

  });

}); //global describe
