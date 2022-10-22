const postRepository = require('../repositories/postRepository'); 
 
module.exports = { 
    async list(){ 
        try{ 
            const post  = await postRepository.getAll(); 
            const total = await postRepository.getTotalCount(); 
 
            return{ 
                data: post, 
                count: total 
            } 
        }catch (err){ 
            throw err; 
        } 
    }, 
 
    create(body){ 
        return postRepository.create(body); 
    }, 
 
    update(body,id){ 
        return postRepository.update(body,id); 
    }, 
 
    delete(id){ 
        return postRepository.delete(id); 
    }, 
 
    getDetail(id){ 
        return postRepository.getById(id); 
    }, 
}