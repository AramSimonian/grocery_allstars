var app = require('../../app.js');
bodyParser = require('body-parser');
const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Index page', function() {

 describe('Get', () => {
   it('should display page', (done) => {
     chai.request(app).get('/').end((err, res) =>{
       expect(res).to.have.status(200);
     });
     done();
   });

 });

}); //global describe
