const models  = require('../../models');
const chai = require ('chai');
const expect = chai.expect;
// const Product = require('../../models/product')
var colors = require('mocha/lib/reporters/base').colors;
colors['diff added'] = 32;
colors['diff removed'] = 31;

describe ('Product Unit Tests', () => {
  describe('#create()', () => {
    it('should create a new product', (done) => {
      models.Product.create({
        name: 'milk',
        barcode: 123,
      }).then((product) => {
        expect(product).to.include({name: 'milk'})
        expect(product).to.include({barcode: '123'})
        done()
      })
    })

    it('should raise an error if name field is blank', (done) => {
        models.Product.create({
            "name": '',
            "barcode": '1234'
        }).then(function (result) {
            expect.fail();
            done();
        }).catch(function (err) {
            expect(err['message']).to.match(/Name cannot be blank./);
            done();
        });
    })
  })
})
