const handleSignup=require('../controllers/authController').handleSignup;
const handleLogin=require('../controllers/authController').handleLogin;
const express=require('express');
const router=express.Router();
router.post('/signup',handleSignup);
router.post('/login',handleLogin);
module.exports=router;