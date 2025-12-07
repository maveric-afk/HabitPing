import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function BadgeUnlock({ badgeTitle, isVisible }) {
    const badgeRef=useRef(null)

    let sound=new Audio('/BadgeUnlock.mp3')
    useEffect(()=>{
        sound.play()
    },[])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        ref={badgeRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Semi-transparent dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
           onClick={()=>{
                    badgeRef.current.style.display='none';
                  }}
          />

          {/* Badge card */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 300,
                duration: 0.6,
              },
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 100,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            className="relative z-10 w-full max-w-sm mx-auto"
          >
            <div className="relative bg-gray-900/95 backdrop-blur-md rounded-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8">
              {/* Neon glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />
              <div className="absolute inset-0 rounded-xl border border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]" />

              <div className="relative z-10 text-center">
                {/* Header text */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-6"
                >
                  New Badge Unlocked!
                </motion.h2>

                {/* Badge image with pulsing glow */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    transition: {
                      delay: 0.3,
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                    },
                  }}
                  className="relative mb-6"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-lg"
                  />
                  <img
                    src={`/${badgeTitle}.jpg`}
                    alt={badgeTitle}
                    className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/30"
                  />
                </motion.div>

                {/* Badge title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                  className="text-xl sm:text-2xl font-bold text-white mb-3"
                >
                  {badgeTitle}
                </motion.h3>


                {/* Continue button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.7, duration: 0.4 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(6,182,212,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>{
                    badgeRef.current.style.display='none';
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/25 transition-all duration-200"
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
