// const express=require('express');

// const authRouter= express.Router();
const {registerUser,loginUser}=require("../controllers/auth.controller");

const {Router}=require("express");   // by destructring the express router directly
const authRouter = Router();

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


module.exports=authRouter;