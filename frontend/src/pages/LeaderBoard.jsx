import { motion } from "framer-motion"
import LeaderboardRow from "../components/LeaderBoardRow"
import { Navigate, NavLink ,useNavigate} from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import api from "../api/axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Leaderboard() {
  const[leaderboardData,setLeaderBoardData]=useState([])
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
      transition: { type: "spring", damping: 15, stiffness: 300 },
    },
  }

  const navigate=useNavigate()
  useEffect(()=>{
    api.get('/api/user/all')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin');
      }
      else if(res.data.users){
        setLeaderBoardData(res.data.users);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen font-inter bg-white p-4 sm:p-6 md:p-8"
       style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FFE8EC 50%, #FFF5ED 100%)",
      }}
    >

      <NavLink 
            to="/"
            className='px-6 py-4 flex items-center gap-1 rounded-2xl border border-[#ffb5de] text-[#ffb5de] absolute top-4 left-4'>
              <ArrowLeft size={20}/>
              Back
            </NavLink>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-[5rem] mb-[2rem] sm:my-12 md:my-16"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">🏆 Leaderboard</h1>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 sm:space-y-4"
        >
          {leaderboardData.map((entry,index) => (
            <motion.div key={entry._id} variants={itemVariants}>
              <LeaderboardRow entry={entry} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
