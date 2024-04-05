
module.exports = {
  async up (queryInterface) {

    await queryInterface.bulkInsert('users', [
      {
       nome: 'John Doe 2',
       password_hash:   "123456",
       email: "john.doe2@jd.com",
       created_at: new Date(),
       updated_at: new Date()
     },
     {
      nome: 'John Doe 3',
      password_hash: "123456",
      email: "john.doe3@jd.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {});
    

    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
