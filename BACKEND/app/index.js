const express = require("express"); 
const morgan = require("morgan"); 
 
const router = require("../config/routes"); 
 
const app = express(); 
 
/** Install request logger */ 
app.use(morgan("dev")); 
 
/** Install JSON request parser */ 
app.use(express.json()); 
 
// install urlencode request parser 
app.use(express.urlencoded({ extended: false })); 
 
/** Install Router */ 
app.use(router); 
 
module.exports = app;