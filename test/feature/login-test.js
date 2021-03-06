var app = require('../../app.js');
var morgan = require('morgan');
bodyParser = require('body-parser');
var Browser = require('zombie');
var assert = require('assert');
var http = require('http');


describe('Login page', function() {
  beforeEach((done) => {
      this.server = http.createServer(app).listen(3000);
      this.browser = new Browser({
          site: 'http://localhost:3000'
      });
      this.browser.visit('/auth/login', done);
  });

  afterEach((done) => {
    this.server.close();
    done();
  })

  describe('Get', () => {
    it('should display page', (done) => {
      assert.ok(this.browser.success);
      done();
    });
  });

  describe('Post', () => {
    beforeEach((done) => {
        this.browser.fill('input[name=email]', "example@email.com");
        this.browser.fill('input[name=password]', "123");
        this.browser.pressButton('Log in');
        done();
    });

    it('should see the products page', (done) => {
          done();
      this.browser.assert.status(200);

    });
  });

}); //global describe
