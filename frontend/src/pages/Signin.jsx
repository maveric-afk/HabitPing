import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useState } from "react"
import Lottie from 'lottie-react'
import {ArrowLeft} from 'lucide-react'
import LoginAnim from '../../Login.json'
import { NavLink ,useNavigate} from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"

export default function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const password = watch("password")
  const navigate=useNavigate();

  const onSubmit = (data) => {
    api.post('/api/user/signin',data)
    .then((res)=>{
        if(res.data.error){
            toast.error(res.data.error);
        }
        else if(res.data.success){
            toast.success(res.data.success);
            navigate('/');
        }
    })
    .catch((err)=>{
        console.log(err);
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
    <div className="min-h-screen bg-white flex font-inter">

      <NavLink 
      to="/"
      className='px-6 py-4 flex items-center gap-1 rounded-2xl border border-[#ffb5de] text-[#ffb5de] absolute top-4 left-4'>
        <ArrowLeft size={20}/>
        Back
      </NavLink>

        {/* Left Side - Image */}
      <motion.div
        className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#FAC3CD]/10 via-white to-[#FADFC8]/10 items-center justify-center p-8"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Lottie animationData={LoginAnim} loop={true}/>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-8 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Account{" "}
              <span className="bg-gradient-to-r from-[#FAC3CD] to-[#FADFC8] bg-clip-text text-transparent">Login</span>
            </h1>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="w-full bg-[#FAC3CD] hover:bg-[#F8B1BB] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FAC3CD]/50 active:scale-95"
              >
                {isSubmitted ? "Welcome! 🎉" : "Sign in"}
              </button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div variants={itemVariants} className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-[#FAC3CD] hover:text-[#F8B1BB] font-medium transition-colors">
                  Sign up
                </NavLink>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
