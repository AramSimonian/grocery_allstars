const User      = require('../../models/user');
const Model     = require('../../models/product');
const chai      = require('chai');
const expect    = chai.expect;
var knex        = require('../../models/database').knex;
var bookshelf   = require('bookshelf')(knex);
var knexCleaner = require('knex-cleaner');

describe('User Products Unit Tests', () => {

  before(function(done) {
    knexCleaner.clean(bookshelf.knex);
    done();
  });

  describe('#create()', () => {
    it('should create a new user product record', (done) => {
      dateNow = Date.now();

      User.forge({
        firstName: 'John',
        lastName: 'Smith',
        password: 'password',
        email: 'example@example.com',
      }).save().then((user) => {
        user.related('products').create(
          { name: 'Test Product',
            description: 'Test Description',
            barcode: '47569825728357'
          }).yield(user);
        console.log('USER: ', user);
        done();
      });
    });


  }) // secondary describe
}); // maine describe
