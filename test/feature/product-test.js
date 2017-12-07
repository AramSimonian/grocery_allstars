const app = require('../app.js');
const Browser = require('zombie');
const chai = require('chai');
const expect = chai.expect;
const http = require('http');

describe('Product feature testing', (done) => {
    before(() => {
        this.server = http.createServer(app).listen(3000);
        this.browser = new Browser({
            site: 'http://localhost:3000'
        });
        this.browser.visit('/', done);
    });

    describe('Add a product', (done) =>{
        it('displays added product on page', () => {
            this.browser.fill('input[name=name]', 'Test Name');
            this.browser.fill('input[name=barcode]', '12345');
            this.browser.pressButton('Submit', done);
            // expect(this.browser.text())
        })
    })

})