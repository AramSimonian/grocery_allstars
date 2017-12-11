'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      expiryDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('', 'consumed', 'discarded')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserProducts');
  }
};
