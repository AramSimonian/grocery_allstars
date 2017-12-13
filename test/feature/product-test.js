const app = require('../../app.js');
const Browser = require('zombie');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const assert = chai.assert;
var knex      = require('../../models/database').knex;
var bookshelf = require('bookshelf')(knex);
var knexCleaner = require('knex-cleaner');

describe.only('Product feature testing', () => {

  before((done) => {
    knexCleaner.clean(bookshelf.knex);
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({
      site: 'http://localhost:3000'
    });
    this.browser.visit('/auth/register').then(() => {
      this.browser.fill('input[name=email]', 'test@test.com');
      this.browser.fill('input[name=password]', 'password');
      this.browser.fill('input[name=firstName]', 'Test');
      this.browser.fill('input[name=lastName]', 'User');
      this.browser.pressButton('Sign up');
      done();
    });
  });

  beforeEach((done) => {
    this.browser.visit('/dashboard', done);
  });

  afterEach((done) => {
    this.server.close();
    done();
  })

  describe('Add a product', () => {
    it('displays added product on page', (done) => {
      // console.log(this.browser.HTMLInputElement())
      this.browser.fill('input[name=name]', 'Test Name');
      this.browser.fill('input[name=barcode]', '12345');
      this.browser.pressButton('Submit').then(() => {
        expect(this.browser.text('div')).to.match(/Test Name/);
        done();
      });
      done();
    })
  })

})
