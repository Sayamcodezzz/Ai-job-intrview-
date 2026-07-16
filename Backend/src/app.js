const express=require("express");
const authController= require('./controllers/auth.controller')
const cookieParser=require("cookie-parser")
const cors = require("cors")

const app=express();

app.use(express.json());  //middlewwa;re
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



// require all the routes here
const authRouter = require("./routes/auth.routes");

// using all the routes here
 app.use("/api/auth",authRouter);



//  /**
//   * @routes POST /api/auth/register
//   * @desc Register new User
//   * @access Public
//   */

//    authRouter.post("/register",authController.registerUser)




module.exports=app;