const models  = require('../../models');
const chai = require ('chai');
const expect = chai.expect;

describe ('User Unit Tests', () => {
  describe('#create()', () => {
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
  }) // secondary describe
}) // maine describe
