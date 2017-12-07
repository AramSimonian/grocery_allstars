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

}); //global describe
