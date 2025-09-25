const jwt=require('jsonwebtoken');

const generateToken=(id,role)=>{
    const token=jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}
module.exports={generateToken};