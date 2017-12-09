const models = require('../../models');
const chai = require('chai');
const expect = chai.expect;

describe('User Unit Tests', () => {
  describe('#create()', () => {

    beforeEach(function () {
      user = models.User.build({
        name: "Example User",
        email: "user@example.com",
        password: "foobar",
        password_confirmation: "foobar"
      });
    });

    it('should create a new user', (done) => {
      models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '123',
        email: 'example@example.com',
      }).then((user) => {
        expect(user).to.include({firstName: 'John'});
        expect(user).to.include({lastName: 'Smith'});
        expect(user).to.include({password: '123'});
        expect(user).to.include({email: 'example@example.com'});
        done();
      })
    })

    it('should raise an error if email is invalid', (done) => {
      models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '123',
        email: 'exampleexample.com',
      }).then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Not a valid email./);
        done();
      });
    })

    
  }) // secondary describe
}); // maine describe
