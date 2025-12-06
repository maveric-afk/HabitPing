import { motion } from "framer-motion"
import { User, Trophy, Plus } from "lucide-react"
import { useEffect } from "react"
import { useState } from "react"
import LoadingScreen from "../components/LoadingScreen"
import Background from '../components/Background'
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const[loading,setLoading]=useState(true)

  const navigate=useNavigate();

  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 3000);
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
                onClick={(e)=>{navigate('/signup')}}
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
      <main className="pt-16 min-h-screen flex items-center justify-center px-4">
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
      </main>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
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
    </div>
        }
    </div>
    
  )
}


//#fac3cd
//#fadfc8