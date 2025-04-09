'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "products", 
          key: "id",
        },
      },
      cart_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "carts", 
          key: "id",
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate:{
          min:1
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      },

    },{
      paranoid: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cartItems');
  }
};