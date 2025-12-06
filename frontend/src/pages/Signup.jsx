import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useState } from "react"
import Lottie from 'lottie-react'
import RegisterAnim from '../../Register.json'
import { ArrowLeft } from "lucide-react"
import { NavLink ,useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api/axios"

export default function Signup() {
     const [isSubmitted, setIsSubmitted] = useState(false)
     const[clicked,setClicked]=useState(false);
     const[emailverified,setEmailVerified]=useState(false);
     const[userData,setUserData]=useState({});
     const[enteredotp,setEnteredotp]=useState('');
     const[realotp,setRealOtp]=useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  const password = watch("password")
  const navigate=useNavigate();

  function handleVerifyEmail(e){
    e.preventDefault();

    if(Number(enteredotp)===Number(realotp)){
        setEmailVerified(true);
        api.post('/api/user/signup',userData)
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error);
            }
            else if(res.data.success){
                toast.success(res.data.success);
                navigate('/signin')
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        toast.error('Wrong otp');
    }
  }

  const onSubmit = (data) => {
    setUserData(data);
    setClicked(true);
    toast.success('otp sent');

    api.post('/api/user/otp',data)
    .then((res)=>{
        if(res.data.error){
            toast.error(res.data.error)
        }
        if(res.data.otp){
            setRealOtp(res.data.otp);
        }
    })
    .catch((e)=>{
        console.log(e);
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
    },
  }

  return (
    <div>
        {
            clicked && !emailverified
            ?<div className="absolute z-10 p-8 rounded-sm bg-white font-inter text-black">
                <h1 className="font-bold text-lg">OTP Verification</h1>
                <p className="text-gray-700 mb-6">An otp is sent to {userData.email}</p>
                <input type="number" name="otp" className="p-4 rounded-2xl" placeholder="Enter the otp" onChange={(e)=>{setEnteredotp(e.target.value)}} />
                <button type="submit" className="px-6 py-4 bg-[#fadfc8] rounded-2xl text-gray-800" onClick={handleVerifyEmail}>Verify</button>
            </div>
            :<div></div>
        }
    <div className={`min-h-screen bg-white ${(clicked && !emailverified) ? 'blur-xs' : ''} flex font-inter`}>

        <NavLink 
              to="/"
              className='px-6 py-4 flex items-center gap-1 rounded-2xl border border-[#ffb5de] text-[#ffb5de] absolute top-4 left-4'>
                <ArrowLeft size={20}/>
                Back
              </NavLink>

      {/* Left Side - Form */}
      <motion.div
        className={`w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8 lg:px-12`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Join us{" "}
              <span className="bg-gradient-to-r from-[#FAC3CD] to-[#FADFC8] bg-clip-text text-transparent">today</span>
            </h1>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nickname Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="Your nickname"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errors.nickname
                    ? "border-red-300 focus:ring-red-200"
                    : "border-[#FAC3CD] focus:border-[#FAC3CD] focus:ring-[#FAC3CD]/20 hover:border-[#FADFC8]"
                } shadow-sm hover:shadow-md`}
                {...register("nickname", { required: "Nickname is required" })}
              />
              {errors.nickname && <p className="mt-1 text-xs text-red-500">{errors.nickname.message}</p>}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200"
                    : "border-[#FAC3CD] focus:border-[#FAC3CD] focus:ring-[#FAC3CD]/20 hover:border-[#FADFC8]"
                } shadow-sm hover:shadow-md`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errors.password
                    ? "border-red-300 focus:ring-red-200"
                    : "border-[#FAC3CD] focus:border-[#FAC3CD] focus:ring-[#FAC3CD]/20 hover:border-[#FADFC8]"
                } shadow-sm hover:shadow-md`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-200"
                    : "border-[#FAC3CD] focus:border-[#FAC3CD] focus:ring-[#FAC3CD]/20 hover:border-[#FADFC8]"
                } shadow-sm hover:shadow-md`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-[#FAC3CD] hover:bg-[#F8B1BB] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FAC3CD]/50 active:scale-95"
              >
                {isSubmitted ? "Welcome! 🎉" : "Create Account"}
              </button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div variants={itemVariants} className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <NavLink to="/signin" className="text-[#FAC3CD] hover:text-[#F8B1BB] font-medium transition-colors">
                  Sign in
                </NavLink>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FAC3CD]/10 via-white to-[#FADFC8]/10 items-center justify-center p-8"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Lottie animationData={RegisterAnim} loop={true}/>
      </motion.div>
    </div>
    </div>
  )
}
