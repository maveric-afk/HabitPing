import { motion } from "framer-motion"

export default function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  const loaderVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 0.7,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative w-28 h-28 md:w-48 md:h-48">
          {/* Outer rotating circle */}
          <motion.div className="absolute inset-0" variants={loaderVariants} animate="animate">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-slate-900 border-r-slate-900 shadow-lg shadow-slate-200"></div>
          </motion.div>

          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-slate-100"
            variants={pulseVariants}
            animate="animate"
          ></motion.div>

          {/* Center logo container */}
          <div className="absolute inset-0 flex items-center justify-center">
              <img src="/HabitPingLOGO.png" alt="LOGO" className="h-16 sm:h-24 md:h-32" />
          </div>
        </div>

        <motion.p
          className="text-slate-600 text-sm md:text-base font-medium tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          HabitPing
        </motion.p>
      </div>
    </motion.div>
  )
}
