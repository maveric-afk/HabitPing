const express=require('express');
const {LoggedinOnly}=require('../middleware')
const {handleUserSignup,handleGetOtp,handleUserSignin,handleLogout,handleGetUser,handleGetAllUsers,handleBadges}=require('../controllers/user')
const router=express.Router();

router.post('/signup',handleUserSignup)
router.post('/otp',handleGetOtp);
router.post('/signin',handleUserSignin);

router.get('/logout',handleLogout)
router.get('/',handleGetUser);
router.get('/all',LoggedinOnly,handleGetAllUsers);
router.get('/badge',handleBadges)

module.exports=router;