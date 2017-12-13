const User = require('../../models/user');
const chai = require('chai');
const expect = chai.expect;

describe('User Unit Tests', () => {

  beforeEach(function(done) {
    knexCleaner.clean(bookshelf.knex);
    done();
  });

  describe('#create()', () => {
    it('should create a new user', (done) => {
      User.forge({
        firstName: 'John',
        lastName: 'Smith',
        password: 'password',
        email: 'test1@example.com',
      }).save().then((user) => {
        expect(user.attributes).to.include({firstName: 'John'});
        expect(user.attributes).to.include({lastName: 'Smith'});
        expect(user.attributes).to.include({password: 'password'});
        expect(user.attributes).to.include({email: 'test1@example.com'});
        done();
      })
    });

    it('should raise an error if email is invalid', (done) => {
      User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '123456',
        email: 'exampleexample.com',
      }).then((result) => {
        expect.fail();
        done();
      }).catch((err) => {
        expect(err['message']).to.match(/Not a valid email./);
        done();
      });
    });

    it('should raise an error if email is not unique', (done) => {
      User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: 'password',
        email: 'example@example.com',
      }).then((result) => {
        expect.fail();
        done();
      }).catch((err) => {
        expect(err['message']).to.match(/That email is already taken/);
        done();
      });
    });

    it('should raise an error if password is not 6 characters', (done) => {
      User.create({
        firstName: 'John',
        lastName: 'Smith',
        password: '12345',
        email: 'test@example.com',
      }).then((result) => {
        expect.fail();
        done();
      }).catch((err) => {
        expect(err['message']).to.match(/Password should be 6 or more charcaters./);
        done();
      });
    })
  }) // secondary describe
}); // maine describe
