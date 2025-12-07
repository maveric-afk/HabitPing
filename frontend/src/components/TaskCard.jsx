import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Copy, Edit3, Clock, Check,SendHorizonalIcon, SendHorizontalIcon,Clock1 } from "lucide-react"
import Lottie from 'lottie-react'
import one from '../../Finance & Money.json'
import two from '../../Health & Fitness.json'
import three from '../../Home & Personal Life.json'
import four from '../../Learning & Study.json'
import five from '../../Self-Care & Wellness.json'
import six from '../../Social & Lifestyle.json'
import seven from '../../Work & Productivity.json'
import toast from "react-hot-toast"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function TaskCard({
  taskId,
  title,
  description,
  startTime,
  endTime,
  category,
  bgColor,
  state
}) {
  const [isChecked, setIsChecked] = useState(false)
  const [isDelayed,setIsDelayed]=useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const[isediting,setIsEditing]=useState(false);
  const[editTitle,setEditTitle]=useState('');
  const[editDesc,setEditDesc]=useState('');

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.02,
      boxShadow:
        "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.5)",
    },
  }

  const iconVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.15, opacity: 1, transition: { duration: 0.2 } },
  }

  const checkboxVariants = {
    unchecked: { scale: 1 },
    checked: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  const navigate=useNavigate()

  function handleCopy(e){
    navigator.clipboard.writeText(title)
    .then((res)=>{
      toast.success('Copied to clipboard')
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  function handleEdit(e){
    setIsEditing(false);
    api.patch(`/api/task/${taskId}`,{title:editTitle,desc:editDesc})
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      else if(res.data.success){
        toast.success(res.data.success);
        title=res.data.newtitle;
        description=res.data.newdesc;
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  function handleDelete(e) {
    api.delete(`/api/task/${taskId}`)
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin');
      }
      else if(res.data.success){
        toast.success(res.data.success);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  function handleCheck(e){
    if(!isChecked){
      api.patch(`/api/task/mark/${taskId}`)
      .then((res)=>{
        if(res.data.error){
          toast.error(res.data.error);
          navigate('/signin')
        }
        else if(res.data.success){
          toast.success(res.data.success);
        }
      })
      .catch((err)=>{
        console.log(err)
      })
       setIsChecked(true);
    }

    else if(isChecked){
      api.patch(`/api/task/unmark/${taskId}`)
      .then((res)=>{
        if(res.data.error){
          toast.error(res.data.error);
          navigate('/signin')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      setIsChecked(false);
    }
  }

  useEffect(()=>{
    if(state==1){
      setIsChecked(true);
    }
    else if(state==0){
      setIsChecked(false)
    }
    else{
      setIsDelayed(true)
    }
  },[])


  return (
    <motion.div
      className={`relative ${(isChecked || isDelayed)?'grayscale-75':''} flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-4 md:p-6 w-full md:max-w-none transition-all duration-300 shadow-md md:shadow-lg`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{backgroundColor:bgColor}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Left Side: Image */}
      {category && (
        <motion.div
          className="flex justify-center md:justify-start md:flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
        {category=='Finance & Money'?<Lottie animationData={one} loop className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Health & Fitness'?<Lottie animationData={two} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Home & Personal Life'?<Lottie animationData={three} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Learning & Study'?<Lottie animationData={four} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Self-Care & Wellness'?<Lottie animationData={five} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Social & Lifestyle'?<Lottie animationData={six} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Work & Productivity'?<Lottie animationData={seven} loop  className="h-[6rem] sm:h-[8rem] md:h-[10rem]"/>:<div></div>}
        {category=='Other'?<img src='/HabitPingLOGO.png'  className="h-[6rem] sm:h-[7rem] md:h-[8rem]"/>:<div></div>}
        </motion.div>
      )}

      {/* Middle Section */}
      <div className="flex-grow min-w-0 text-center md:text-left">
        {/* Title */}
        <motion.h3
          className={`font-bold text-sm md:text-xl text-gray-800 truncate ${
            isChecked ? "line-through text-gray-500" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {!isediting
          ?title
          :<input type="text" placeholder="Enter title" className="rounded-sm p-2 text-sm" onChange={(e)=>{setEditTitle(e.target.value)}}/>}
        </motion.h3>

        {/* Description */}
        {description && (
          <motion.p
            className="text-xs md:text-sm text-gray-500 line-clamp-1 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
          {!isediting
          ?description
          :<div className="flex items-center gap-4">
            <input type="text" className="rounded-sm p-2 text-sm text-gray-800" placeholder="Enter description" onChange={(e)=>{setEditDesc(e.target.value)}}/>
            <SendHorizontalIcon className="text-[0.7rem] sm:text-[1rem] md:text-2xl" onClick={handleEdit}/>
            </div>}
          </motion.p>
        )}

        {/* Category & Time Row */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {category && (
            <motion.span
              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              {category}
            </motion.span>
          )}

          {(startTime || endTime) && (
            <motion.div
              className="flex items-center gap-1 text-xs text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Clock size={14} />
              <span>
                {startTime} {endTime && `→ ${endTime}`}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex-shrink-0 flex gap-2 md:flex-col md:gap-1 items-center justify-center">
        {/* Checkbox */}
        <motion.button
          disabled={isDelayed}
          onClick={handleCheck}
          className="flex items-center justify-center "
          variants={checkboxVariants}
          animate={isChecked ? "checked" : "unchecked"}
        >
          <motion.div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              isChecked
                ? "bg-green-500 border-green-500"
                : "border-gray-700 hover:border-gray-500"
            }
            ${isDelayed
              ?"bg-red-500 border-red-500"
              :""
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isChecked && <Check size={16} className="text-white" />}
            {isDelayed && <Clock1 size={16} className="text-white" /> }
          </motion.div>
        </motion.button>

        {/* Icons */}
        <div className="flex gap-1 md:gap-0 md:flex-col md:gap-1">
         
            <motion.button
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              onClick={(e)=>{
                if(isediting){
                  setIsEditing(false);
                }
                else{
                  setIsEditing(true);
                }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit3 size={20} />
            </motion.button>
          

          
            <motion.button
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              onClick={handleCopy}
              whileTap={{ scale: 0.9 }}
            >
              <Copy size={20} />
            </motion.button>
          

          
            <motion.button
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              onClick={handleDelete}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={20} />
            </motion.button>
          
        </div>
      </div>
    </motion.div>
  )
}
