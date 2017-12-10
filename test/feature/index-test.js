var app = require('../../app.js');
var morgan = require('morgan');
bodyParser = require('body-parser');
const Browser = require('zombie');
const assert = require('assert');
const http = require('http');

describe('Index page', function() {

  beforeEach((done) => {
      this.server = http.createServer(app).listen(3000);
      this.browser = new Browser({
          site: 'http://localhost:3000'
      });
      this.browser.visit('/', done);
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

  describe('Log in form', () => {
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

  describe('Sign in button', () => {
    beforeEach((done) => {
      this.browser.pressButton('Sign up');
      done();
    });

    it('should take you to the sign up page', (done) => {
      done();
      this.browser.assert.text('title', 'Welcome to Grocery AllStars');
    });
  });

}); //global describe
