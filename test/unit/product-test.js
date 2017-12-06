const models  = require('../../models');
const chai = require ('chai');
const expect = chai.expect;
// const Product = require('../../models/product')


describe ('Product Unit Tests', () => {
  describe('#create()', () => {
    it('should create a new product', (done) => {
      models.Product.create({
        name: 'milk',
        barcode: 123,
      }).then((product) => {
        expect(product).to.include({name: 'milk'})
        done()
      })
    })

    // it('should raise an error if name field is blank', (done) => {
    //   models.Product.create({
    //     name: "",
    //     barcode: 123,
    //   }).then((product) => {
    //     console.log(product)
    //     // expect(product)
    //   })
    // })
  })
})
