const models = require('../../models');
const chai = require('chai');
const expect = chai.expect;
// const Product = require('../../models/product')

describe('Product Unit Tests', () => {

  before(function(done) {
    models.Product.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        done(null);
      })
      .error(function(error) {
        done(error);
      });
  });

  describe('#create()', () => {
    it('should create a new product', (done) => {
      git branches
      models.Product.create({
        name: 'milk',
        barcode: 123,
      }).then((product) => {
        models.Product.addUser();
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
        expect(err['message']).to.match(/Name cannot be empty./);
        done();
      });
    })

    it('should raise an error if barcode field is blank', (done) => {
      models.Product.create({
        "name": 'bread',
        "barcode": ''
      }).then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Barcode cannot be empty./);
        done();
      });
    })
  })
})
