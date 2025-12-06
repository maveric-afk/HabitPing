import { motion } from "framer-motion"
import { LeaderboardRow } from "../components/LeaderBoardRow"
import { NavLink } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const leaderboardData = [
  { id: 1, rank: 1, name: "Alice Johnson", points: 2850, badge: "gold" },
  { id: 2, rank: 2, name: "Bob Smith", points: 2720, badge: "silver" },
  { id: 3, rank: 3, name: "Carol Davis", points: 2615, badge: "bronze" },
  { id: 4, rank: 4, name: "David Wilson", points: 2480, badge: null },
  { id: 5, rank: 5, name: "Emma Brown", points: 2340, badge: null },
  { id: 6, rank: 6, name: "Frank Miller", points: 2210, badge: null },
  { id: 7, rank: 7, name: "Grace Lee", points: 2095, badge: null },
  { id: 8, rank: 8, name: "Henry Taylor", points: 1950, badge: null },
  { id: 9, rank: 9, name: "Ivy Martinez", points: 1820, badge: null },
  { id: 10, rank: 10, name: "Jack Anderson", points: 1705, badge: null },
]

export default function Leaderboard() {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white p-4 sm:p-6 md:p-8"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FAC3CD 50%, #FADFC8 100%)",
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
        className="mb-8 sm:mb-12 md:mb-16"
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
          {leaderboardData.map((entry, index) => (
            <motion.div key={entry.id} variants={itemVariants}>
              <LeaderboardRow entry={entry} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
