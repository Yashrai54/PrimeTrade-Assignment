const jwt=require('jsonwebtoken');
const User=require('../models/user.model.js');

const isAuth=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token) return res.status(401).json({message:"No token, authorization denied"});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select('-password');
        next();
    }
    catch(err){
        console.error('Auth middleware error:',err);
        res.status(401).json({message:"Token is not valid"});
    }
}
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Admin access only" });
  }
};
module.exports={isAuth,admin};