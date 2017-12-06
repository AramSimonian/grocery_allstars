const models = require('../../models');
const chai = require('chai');
const expect = chai.expect;

describe('User Unit Tests', () => {
  describe('#create()', () => {
    it('should create a new product', (done) => {
      models.User.create({
        firstname: 'Test',
        lastname: 'User',
        username: 'testuser',
        email: 'test@user.com',
        password: 'abc',
      }).then((user) => {
        expect(user).to.include({username: 'testuser'})
        done();
      })
    })
  })
})
