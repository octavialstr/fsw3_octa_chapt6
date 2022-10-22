'use strict'; 
const bcrypt = require('bcryptjs'); 
 
  function encryptPassword(str){ 
    try{ 
        const hash =  bcrypt.hash(str,10); 
        return hash; 
    }catch(err){ 
        console.log(err); 
        throw err; 
    } 
} 
 
 
/** @type {import('sequelize-cli').Migration} */ 
module.exports = { 
  async up (queryInterface, Sequelize) { 
    const passSuper = await (encryptPassword('superAdmin')); 
    const pass = await (encryptPassword('admin')) 
    const member = await (encryptPassword('member')) 
      return queryInterface.bulkInsert('Users', [{ 
      email: 'octa@gmail.com', 
      password: passSuper, 
      name:'Octa', 
      status:'super admin', 
      createdby:'octa',  
      createdAt: new Date(), 
      updatedAt: new Date() 
    }, 
      { 
      email: 'via@gmail.com', 
      password: pass, 
      name:'via', 
      status:'admin', 
      createdby:'via', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }, 
      { 
      email: 'anakgueh@gmail.com', 
      password: member, 
      name:'anakgueh', 
      status:'member', 
      createdby:'anakgueh', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    } 
  ] 
    ) 
     
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