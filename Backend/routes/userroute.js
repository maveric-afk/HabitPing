const express=require('express');
const {handleUserSignup,handleGetOtp,handleUserSignin,handleLogout}=require('../controllers/user')
const router=express.Router();

router.post('/signup',handleUserSignup)
router.post('/otp',handleGetOtp);
router.post('/signin',handleUserSignin);

router.get('/logout',handleLogout)

module.exports=router;