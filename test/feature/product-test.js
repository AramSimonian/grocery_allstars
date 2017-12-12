const app = require('../../app.js');
const Browser = require('zombie');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');
const assert = chai.assert;

describe('Product feature testing', () => {
    beforeEach((done) => {
      this.server = http.createServer(app).listen(3000);
      this.browser = new Browser({
            site: 'http://localhost:3000'
        });
      this.browser.visit('/dashboard', done);
    });

    afterEach((done) => {
      this.server.close();
      done();
    })

    describe('Add a product', () =>{
        it('displays added product on page', (done) => {
          // console.log(this.browser.HTMLInputElement())
            this.browser.fill('input[name=name]', 'Test Name');
            this.browser.fill('input[name=barcode]', '12345');
            this.browser.pressButton('Submit').then( () => {
              expect(this.browser.text('div')).to.match(/Test Name/);
              done();
            });
            done();
        })
    })

})
