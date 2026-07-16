// const express=require('express');

// const authRouter= express.Router();
const {registerUser,loginUser,logoutUser,getMe}=require("../controllers/auth.controller");

const {Router}=require("express");   // by destructring the express router directly
const authRouter = Router();
const authUser=require('../middleware/auth.middleware').authUser


/**
 * @Route POST /api/auth/register
 * @description Register a new user , with username, email and password
 * @access Public
 */


authRouter.post("/register",registerUser);

/**
 * @Route Post /api/auth/login
 * @description login a user , with email and password
 * @access Public
 */

authRouter.post("/login",loginUser);

/**
 * @Route Get /api/auth/logout
 * @description  clear token from user cookies and the token in blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUser);



/**\
 * @ Route GET /api/auth/get-me
 * @description Get the current logged in user deatils
 * @access Private 
 */

authRouter.get("/get-me",authUser,getMe);



module.exports=authRouter;