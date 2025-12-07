import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut } from "lucide-react"

export default function Profile({
  nickname,
  score,
  badge,
  onClose,
  onLogout,
  isOpen
}) {
  const [isHoveringLogout, setIsHoveringLogout] = useState(false)

  const sliderVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.4,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.3,
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15,
        duration: 0.4,
      },
    },
  }

  return (
    <AnimatePresence>
     {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* Slider */}
          <motion.div
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-50 w-[80%] bg-white shadow-2xl md:w-[55%] lg:w-[400px]"
          >
            {/* Close Button */}
            <button
            onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close slider"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex h-full flex-col justify-between p-6"
            >
              {/* Top Section */}
              <div className="space-y-6">
                {/* Nickname */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Nickname</p>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ color: "#1a1a1a" }}>
                    {nickname}
                  </h2>
                </div>

                {/* Score Badge */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Score</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block rounded-2xl px-6 py-3 text-2xl font-bold text-white"
                    style={{ backgroundColor: "#fac3cd" }}
                  >
                    {score.toLocaleString()}
                  </motion.div>
                </div>

                {/* Badge Section */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Rank</p>
                  <motion.div whileHover={{ y: -4 }} className="rounded-2xl p-4" style={{ backgroundColor: "#fadfc8" }}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={`/${badge}.jpg`}
                          alt={badge}
                          className="h-16 w-16 rounded-full object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-600">Rank Badge</p>
                        <p className="text-lg font-bold text-gray-900">{badge}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                onHoverStart={() => setIsHoveringLogout(true)}
                onHoverEnd={() => setIsHoveringLogout(false)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
                className="w-full rounded-xl px-6 py-3 font-semibold text-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: isHoveringLogout ? "#fadfc8" : "#fac3cd",
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
            </motion.div>
          </motion.div>
        </>
     )}
        
    </AnimatePresence>
  )
}
