const jwt=require("jsonwebtoken");
const blacklistTokenModel=require("../models/blacklist.model");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req,res,next){

    const  token =req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Token not found"})
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token:token});


     if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is blacklisted, please login"
        })
     }
try{

    const decoded=  jwt.verify(token,process.env.SECRET_KEY);
  req.user=decoded;
  next()

}catch(err){
    return res.status(401).json(
        {
            message:"Invalid token"
        }
    )

}

}

module.exports={authUser};