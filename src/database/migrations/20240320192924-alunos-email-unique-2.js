'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:*/
    await queryInterface.changeColumn('alunos', 'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true

    });
     
  },

  async down () {}};
