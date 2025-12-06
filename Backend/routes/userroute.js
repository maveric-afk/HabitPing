const express=require('express');
const {handleUserSignup,handleGetOtp,handleUserSignin,handleLogout,handleGetUser}=require('../controllers/user')
const router=express.Router();

router.post('/signup',handleUserSignup)
router.post('/otp',handleGetOtp);
router.post('/signin',handleUserSignin);

router.get('/logout',handleLogout)
router.get('/',handleGetUser);

module.exports=router;