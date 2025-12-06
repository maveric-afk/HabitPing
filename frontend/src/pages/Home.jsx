import { motion } from "framer-motion"
import { User, Trophy, Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import LoadingScreen from "../components/LoadingScreen"
import Background from '../components/Background'
import { useNavigate } from "react-router-dom"
import Profile from "../components/Profile"
import api from "../api/axios"
import toast from "react-hot-toast"
import TaskCard from "../components/TaskCard"

export default function Home() {
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const[loading,setLoading]=useState(true)
  const[loggedIn,setLoggedIn]=useState(false);
  const[user,setUser]=useState({});
  const[alltasks,setAlltasks]=useState([])
  const [sliderOpen, setSliderOpen] = useState(false)

  const navigate=useNavigate();

  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 3000);
  },[])

  useEffect(()=>{
    api.get('/api/user/')
    .then((res)=>{
      if(res.data.user){
        setUser(res.data.user);
        setLoggedIn(true);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  },[])


  useEffect(()=>{
    api.get('/api/task/all')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      else if(res.data.tasks){
        setAlltasks(res.data.tasks);
      }
    })
  },[])

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const mainTextVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  }

  const iconVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  function handleLogout(e){
    api.get('/api/user/logout')
    .then((res)=>{
      toast.success(res.data.success);
      setSliderOpen(false);
      setLoggedIn(false)
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  function handleClickUser(e){
    if(!loggedIn){
      navigate('/signup')
    }
    else if(loggedIn){
      setSliderOpen(true);
    }
  }

  const userTasks=[];

  alltasks.forEach((task)=>{
    if(user.Tasks.includes(task._id)){
      userTasks.push(task);
    }
  })
 
  return (
    <div>
        {
           loading
        ?<LoadingScreen/>
        :<div className="min-h-screen bg-white font-sans">
            <Background/>

      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 p-4 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <img src="/HabitPingLOGO.png" alt="Logo" className="h-10 w-10 md:h-16 md:w-16" />             
            </motion.div>

            {/* Icons on the right */}
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleClickUser}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Profile"
              >
                <User size={28} className="text-[#e49aa8]" strokeWidth={1.5} />
              </motion.button>

              <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={(e)=>{navigate('/leaderboard')}}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Leaderboard"
              >
                <Trophy size={28} className="text-[#e49aa8]" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main body with centered text */}
      {loggedIn && userTasks.length>0
      ?<div className="grid grid-cols-1 gap-8 mt-[10rem] mx-[1rem] lg:mt-[15rem] lg:mx-[5rem] md:gap-6">
       {userTasks.map((task)=>(
        <div>
          {task.Start
          ?<TaskCard title={task.Title} description={task.Description} bgColor={task.Color} category={task.Category} startTime={task.Start} endTime={task.End}/>
          :<TaskCard title={task.Title} description={task.Description} bgColor={task.Color} category={task.Category}/>}
          
        </div>
       ))}
      </div>
       :<main className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h1
            variants={mainTextVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
          >
            <span className="text-balance">
              Little Habits.{" "}
              <span className="bg-gradient-to-r from-[#FAC3CD] to-[#FADFC8] bg-clip-text text-transparent">
                Big Wins.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
          >
            Build small, consistent habits that compound into extraordinary results
          </motion.p>
        </div>
      </main>}
      

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={(e)=>{navigate('/addtask')}}
        onHoverStart={() => setIsHoveringButton(true)}
        onHoverEnd={() => setIsHoveringButton(false)}
        className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 bg-[#FAC3CD] hover:bg-[#F8A8BB] text-white rounded-full p-4 sm:p-5 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
        aria-label="Add new habit"
      >
        <Plus size={24} strokeWidth={2} />
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={isHoveringButton ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden whitespace-nowrap font-medium text-sm sm:text-base"
        >
          Add New
        </motion.span>
      </motion.button>

       <Profile
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        nickname={user.NickName}
        score={user.Points}
        badge={user.Rank}
        onLogout={handleLogout}
      />

    </div>
        }
    </div>
    
  )
}


//#fac3cd
//#fadfc8