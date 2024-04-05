'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
    await queryInterface.createTable('users', 
    { 
      id: { 
        type:          Sequelize.INTEGER,
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true
      },
      nome: {
        type:         Sequelize.STRING,
        allowNull:    false,
      }, 
      password_hash: {
        type:         Sequelize.STRING,
        allowNull:    false,
      },
      email: {
        type:         Sequelize.STRING,
        unique:       true,
        allowNull:    false,
      },
      created_at: {
        type:   Sequelize.DATE,
        allowNull:    false,
      },
      updated_at: {
        type:   Sequelize.DATE,
        allowNull:    false,
      },
    });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:*/
    await queryInterface.dropTable('users');
    
  }
};
