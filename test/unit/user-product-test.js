const models = require('../../models');
const chai = require('chai');
const expect = chai.expect;

describe('User Products Unit Tests', () => {

  before(function(done) {
    models.User.sync({ force : true }) // drops table and re-creates it
      .then(function() {
        done(null);
      })
      .error(function(error) {
        done(error);
      });
  });

  describe('#create()', () => {
    it('should create a new user product record', (done) => {
      dateNow = Date.now();
      const user = models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: 'password',
        email: 'example@example.com',
      }).then((result) => {
        // user.addProduct();
        console.log('USER: ', user.products);
        done();
      });

      console.log('USER: ', user);
      // models.UserProducts.create({
      //   userId: 1,
      //   productId: 1,
      //   expiryDate: dateNow,
      //   status: '',
      // }).then((userProduct) => {
      //   expect(userProduct).to.include({userId: 1});
      //   expect(userProduct).to.include({productId: 1});
      //   expect(userProduct).to.include({expiryDate: dateNow});
      //   expect(userProduct).to.include({status: ''});
      //   done();
      // })
    });


  }) // secondary describe
}); // maine describe
