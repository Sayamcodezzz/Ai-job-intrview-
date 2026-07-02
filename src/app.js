const express=require("express");
const authController= require('./controllers/auth.controller')

const app=express();

app.use(express.json());  //middlewware



// require all the routes here
const authRouter = require("./routes/auth.routes");

// using all the routes here
 app.use("/api/auth",authRouter);



 /**
  * @routes POST /api/auth/register
  * @desc Register new User
  * @access Public
  */

   authRouter.post("/register",authController.registerUser)




module.exports=app;