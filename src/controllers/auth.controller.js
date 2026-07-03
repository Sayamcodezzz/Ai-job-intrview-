const userModel = require("../models/user.model")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const tokenBlacklistModel =require("../models/blacklist.model")
/**
 * @route Post /api/auth/regsiter
 * @description  Register a new user , expects username, email and password in the request.body
 * @access Public
 */
async function registerUser(req, res) {
    // Implementation for user registration

    const { username, email, password } = req.body;


     // if any of the fields are missing , during registration
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }


    

    // check if the user already exists in the database
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email: email }, { username: username }]
    })
    if (isUserAlreadyExists) {
        if (isUserAlreadyExists.email == email) {

            return res.status(400).json({ message: 'Email Already Exists' });
        }
        if (isUserAlreadyExists.username == username) {
            return res.status(400).json({ message: "Username Already Exists" });
        }
    }

    const hash= await bcrypt.hash(password,10);

    const user= await userModel.create({
        username,
        email,
        password:hash,
    })
    const token = jwt.sign({id:user._id , username:user.username},
         process.env.SECRET_KEY,
         { expiresIn: "1d" }
        )


  res.cookie("token",token);
  res.status(201).json({
    message:"User Registered Succcessfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
    }

  })


}



/**
 * @route Post /api/auth/login
 * @description Login a user , expects email and password 
 * @access Public
*/ 

async function loginUser(req,res){

 const {email , password}=req.body;

   if(!email || !password){
    return res.status(400).json({ message: "Email and password are required" });
   }

   const user= await userModel.findOne({email:email});
   if(!user){

    return res.status(400).json ({message:"Invalid credentials"});

   }
     const isPasswordValid = await bcrypt.compare(password,user.password);
     if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"});
     }

     const token=jwt.sign({id:user._id , username:user.username},
        process.env.SECRET_KEY,
        {expiresIn:"1d"},
     );

     res.cookie("token",token);
     res.status(200).json({
        message:"User Loggedin Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
     })

     
}


/**
 * @Route logoutUser
 * @description clear token from user cookies and add the token in blac\
 * @access Public
 */

async function logoutUser(req,res){
    const token=req.cookies.token;
    if(token){
        await tokenBlacklistModel.create({token:token});

    }
    res.clearCookie("token");
    res.status(200).json({message:"User logged out successfully"});
}


/**\
 * @ Route GET /api/auth/get-me
 * @description Get the current logged in user deatils
 * @access Private 
 */

async function getMe(req,res){

   const user= await userModel.findById(req.user.id);

   res.status(200).json({
    message:"User Details fetched successfully",
    id:user._id,
    username:user.username,
    email:user.email,
   })

}




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
}