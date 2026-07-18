const express = require("express");
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controllers/interview.controller")

const interviewRouter=express.Router();

/**
 * @route POST /api/interview
 * @description :-  Generate new interview report on the basis of user
 *  self description resume pdf and job pdf
 * @access Private
 * 
 * 
 */

interviewRouter.post("/",authMiddleware.authUser,interviewController.generateInterviewReportController)



module.exports=interviewRouter