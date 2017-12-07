var app = require('../../app.js');
var morgan = require('morgan');
bodyParser = require('body-parser');
var Browser = require('zombie');
var assert = require('assert');
var http = require('http');


describe('Signup page', function() {

  before(function() {
    this.server = http.createServer(app).listen(3001);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({
      site: 'http://localhost:3000'
    });
  });

  // load the contact page
  beforeEach(function(done) {
    this.browser.visit('/signup', done);
  });

  describe('Get', function() {

    it('should display page', function() {
      assert.ok(this.browser.success);
    });

  });

  describe('Post', function () {

    // before(function (done) {
    //     this.browser.visit('/signup', done);
    // });


    before(function (done) {

        this.browser.fill('input[name=firstName]', 'John');
        this.browser.fill('input[name=lastName]', 'Smith');
        this.browser.fill('input[name=email]', "example@email.com");
        this.browser.fill('input[name=password]', "123");
        this.browser.pressButton('Sign Up');
        done();
    });



    it('should see the products page', function() {

      this.browser.assert.status(200);
    });
});

}); //global describe
