const { mobil } = require("../models"); 
 
module.exports = { 
    create(body) { 
        return mobil.create(body); 
    }, 
 
    update(id, body) { 
        return mobil.update(body, {where:{id}}); 
    }, 
 
    delete(id) { 
    return mobil.destroy({where:{id}}); 
    }, 
 
    getById(id) { 
        return mobil.findByPk(id); 
    }, 
 
    getAll() { 
        return mobil.findAll(); 
    }, 
 
    getTotalCount() { 
        return mobil.count(); 
    }, 
};