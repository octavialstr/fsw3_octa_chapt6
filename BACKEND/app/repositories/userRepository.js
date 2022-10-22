const { Users } = require('../models'); 
 
module.exports = { 
    created(body){ 
        return Users.create(body) 
    }, 
 
    findUser(email){ 
        return Users.findOne({where:email}) 
    }, 
 
    getAllUser(){ 
        return Users.findAll(); 
    }, 
 
    getCountUser(){ 
        return Users.count(); 
    }, 
 
    findUserByPk(id){ 
        return Users.findByPk(id); 
    },
}