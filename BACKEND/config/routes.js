const express = require("express"); 
const controllers = require("../app/controllers"); 
const swaggerUI = require("swagger-ui-express"); 
const swgDoc = require("../openapi.json");

 
const appRouter = express.Router(); 
const apiRouter = express.Router(); 
appRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc));
 
/** Mount GET / handler */ 
appRouter.get("/", controllers.main.index); 
 
/** 
 * TODO: Implement your own API 
 *       implementations 
 */ 
apiRouter.get("/api/v1/mobil",
controllers.api.v1.auth.authAdmin,    
controllers.api.v1.mobil.list); 
apiRouter.post("/api/v1/add",
controllers.api.v1.auth.authAdmin,
controllers.api.v1.mobil.create); 
apiRouter.put( 
    "/api/v1/mobil/:id",
    controllers.api.v1.auth.authAdmin, 
    controllers.api.v1.mobil.update 
); 
apiRouter.get( 
    "/api/v1/mobil/:id",
    controllers.api.v1.auth.authAdmin,
    controllers.api.v1.mobil.show 
); 
apiRouter.delete( 
    "/api/v1/mobil/:id", 
    controllers.api.v1.auth.authAdmin,
    controllers.api.v1.mobil.deletedBy,
    controllers.api.v1.mobil.destroy 
); 
apiRouter.get( 
    "/api/v1/mobil", 
    controllers.api.v1.auth.authAdmin,
    controllers.api.v1.mobil.showSize 
); 
apiRouter.post( 
    "/api/v1/register", 
    controllers.api.v1.auth.register
); 
apiRouter.post( 
    "/api/v1/login", 
    controllers.api.v1.auth.login
); 
// tambah admin
apiRouter.post( 
    "/api/v1/tambahadmin", 
    controllers.api.v1.auth.authSuperAdmin,
    controllers.api.v1.auth.ToAdmin
); 
apiRouter.get("/api/v1/whoAmi",  
    controllers.api.v1.auth.authorize,  
    controllers.api.v1.auth.whoAmI 
);
 
/** 
 * TODO: Delete this, this is just a demonstration of 
 *       error handler 
 */ 
apiRouter.get("/api/v1/errors", () => { 
    throw new Error( 
        "The Industrial Revolution and its consequences have been a disaster for the human race." 
    ); 
}); 
 
apiRouter.use(controllers.api.main.onLost); 
apiRouter.use(controllers.api.main.onError); 
 
/** 
 * TODO: Delete this, this is just a demonstration of 
 *       error handler 
 */ 
appRouter.get("/errors", () => { 
    throw new Error( 
        "The Industrial Revolution and its consequences have been a disaster for the human race." 
    ); 
}); 
 
appRouter.use(apiRouter); 
 
/** Mount Not Found Handler */ 
appRouter.use(controllers.main.onLost); 
 
/** Mount Exception Handler */ 
appRouter.use(controllers.main.onError); 
 
module.exports = appRouter;