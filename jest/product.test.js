import Sequelize from 'sequelize';
import { createQueryInterfaceMock, field } from 'sequelize-test-utils';
import { up, down } from '../migrations/20171205152902-create-product.js'

describe('Test validation of product model', () => {

  describe('#up', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    up(queryInterface, Sequelize);
    expect(queryInterface.createTable).toBeCalled();

    const call = queryInterface.createTable.mock.calls[0];
    expect(call[0]).to.equal('products');
  });

})
