const models = require('../../models');
const chai = require('chai');
const expect = chai.expect;

describe('User Unit Tests', () => {
  describe('#create()', () => {
    it('should create a new user', (done) => {
      models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: 'password',
        email: 'example@example.com',
      }).then((user) => {
        expect(user).to.include({firstName: 'John'});
        expect(user).to.include({lastName: 'Smith'});
        expect(user).to.include({password: 'password'});
        expect(user).to.include({email: 'example@example.com'});
        done();
      })
    });

    it('should raise an error if email is invalid', (done) => {
      models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '123456',
        email: 'exampleexample.com',
      }).then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Not a valid email./);
        done();
      });
    });

    it('should raise an error if password is not 6 characters', (done) => {
      models.User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '12345',
        email: 'test@example.com',
      }).then(function (result) {
        expect.fail();
        done();
      }).catch(function (err) {
        expect(err['message']).to.match(/Password should be 6 or more charcaters./);
        done();
      });
    })
  }) // secondary describe
}); // maine describe
