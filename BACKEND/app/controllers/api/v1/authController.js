const authService = require('../../../services/authService');

module.exports = {
    register(req,res){
        const {email, password, name, status} = req.body;

        authService.register(email, password, name, status).then((user)=>{
            res.status(201).json({
                status:"OK",
                data:user
            })
        }).catch((err)=>{
                res.status(400).json({
                    status:"FAIL",
                    message: err.message,
                })
            });
    },
    

    login(req, res){
        const {email, password} = req.body;

        authService.login(email, password).then((auth)=>{
            if(!auth){
                res.status(401).json({
                    status: "FAIL",
                    message: "Email or password is incorrect",
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        }).catch((err)=>{
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        })
    },

    authorize(req, res, next){ 
        const bearerToken = req.headers.authorization; 
        if(!bearerToken){ 
            res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
        } 
 
        const token = bearerToken.split('Bearer ')[1]; 
 
        authService.authorize(token).then(user=>{ 
            if(!user){ 
                res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
            } 
 
            req.user = user; 
            next(); 
        }).catch((err) =>{ 
            res.status(403).json({ 
                    message:"Unauthorized" 
            }) 
        }) 
    },

    whoAmI(req, res){ 
        const user = req.user; 
        console.log(user) 
        res.status(201).json({ 
            status:"OK", 
            data: user, 
        }) 
    },
    async ToAdmin(req, res) { 
        try { 
            const {email, password, name, } = req.body; 
            const createdby = req.user.name; 
            const status = 'admin'; 
            console.log(createdby) 
            const user = await authService.ToAdmin(email, password , name , status , createdby); 
            res.status(201).json({ 
                status: "OK", 
                data: user, 
            }); 
        } catch (err) { 
            res.status(201).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    },
    authAdmin(req, res, next){ 
        const bearerToken = req.headers.authorization; 
        if(!bearerToken){ 
            res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
        } 
        const token = bearerToken.split('Bearer ')[1]; 
        authService.authorize(token).then(user=>{ 
            if(!user){ 
                res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
            } 
            console.log(user.status) 
            if((user.status != ('admin') && (user.status != 'super admin') )){ 
                res.status(403).json({ 
                    message:"you are not allowed" 
                }) 
                return; 
            } 
 
            req.user = user; 
            next(); 
        }).catch((err) =>{ 
            res.status(403).json({ 
                    message:"Unauthorized" 
            }) 
        }) 
    }, 
 
    authSuperAdmin(req, res, next){ 
        const bearerToken = req.headers.authorization; 
        if(!bearerToken){ 
            res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
        } 
        const token = bearerToken.split('Bearer ')[1]; 
 
        authService.authorize(token).then(user=>{ 
            if(!user){ 
                res.status(403).json({ 
                    message:"Unauthorized" 
                }) 
                return; 
            } 
            console.log(user.status) 
            if(user.status != 'super admin' ){ 
                res.status(403).json({ 
                    message:"you are not allowed" 
                }) 
                return; 
            } 
            req.user = user; 
            next(); 
        }).catch((err) =>{ 
            res.status(403).json({ 
                    message:"Unauthorized" 
            }) 
        }) 
    },
}


