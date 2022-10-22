const bcrypt = require('bcryptjs'); 
const userRepository = require('../repositories/userRepository'); 
const jwt = require('jsonwebtoken') 
 
 
async function encryptPassword(str){ 
    try{ 
        const hash = await bcrypt.hash(str,10); 
        return hash; 
    }catch(err){ 
        console.log(err); 
        throw err;
    } 
}
// (encryptPassword('admin123').then((hash)=>{console.log(hash)})) 
 
 
async function comparePassword(password, encryptedPassword){ 
    try{ 
        const isValid = await bcrypt.compare(password, encryptedPassword); 
        return isValid 
    }catch(err){ 
        console.log(err); 
        throw err; 
    } 
} 
 
const SECRET_KEY = 'Secret' 
function createWebToken(payload){ 
    return jwt.sign(payload,  SECRET_KEY); 
} 
 
function verifyToken(token){ 
    return jwt.verify(token, SECRET_KEY) 
} 
// encryptPassword('admin123').then((hash) =>{ 
//     comparePassword('admin123',hash).then((isValid) => console.log(isValid)) 
// }) 
 
module.exports = { 
    async register(email, password, name, status){ 
        try{ 
            const encryptedPassword = await encryptPassword(password); 
            const body = { 
                email, 
                password: encryptedPassword, 
                name, 
                status 
            } 
            const user = await userRepository.created(body) 
            console.log(user)
            return user; 
        }catch (err){ 
            throw err; 
        } 
    }, 
 
    async login(email, password){ 
        try{ 
            const user = await userRepository.findUser({email}); 
 
            if(!user){ 
                return false; 
            } 
 
            const {password: encryptedPassword} = user; 
 
            const isAuthenticated = await comparePassword(password, encryptedPassword); 
             
            if(!isAuthenticated){ 
                return false; 
            } 
 
            //generate token here 
            const token = createWebToken({ 
                id: user.id, 
                email: user.email 
            }) 
            console.log(token) 
            const data = { 
                ...user.dataValues, 
                token 
            } 
 
            return data; 
        }catch(err){ 
            throw err; 
        } 
    }, 
 
    async authorize(token){ 
        try{ 
            const payload = verifyToken(token); 
 
            const id = payload?.id; 
 
            const user = await userRepository.findUserByPk(id); 
 
            return user; 
        }catch(err){ 
            throw err; 
        } 
    }, 
    async ToAdmin(email, password, name, status, createdby){ 
        try{ 
 
            const encryptedPassword = await encryptPassword(password); 
            const body = { 
                email, 
                password: encryptedPassword, 
                name, 
                status, 
                createdby, 
            } 
            const user = await userRepository.created(body) 
            return user; 
        }catch (err){ 
            throw err; 
        } 
         
    },
}