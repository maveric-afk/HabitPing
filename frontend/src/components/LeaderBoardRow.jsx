"use client"

import { motion } from "framer-motion"

export function LeaderboardRow({ entry, index }) {
  const getBadgeDisplay = (type) => {
    const badges = {
      gold: { emoji: "🥇", bg: "bg-yellow-50", text: "text-yellow-700" },
      silver: { emoji: "🥈", bg: "bg-gray-100", text: "text-gray-700" },
      bronze: { emoji: "🥉", bg: "bg-orange-50", text: "text-orange-700" },
    }
    const badge = badges[type]
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}
      >
        {badge.emoji}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    )
  }

  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-600"
    if (rank === 2) return "text-gray-500"
    if (rank === 3) return "text-orange-600"
    return "text-slate-600"
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      className="group"
    >
      <div
        className="rounded-xl p-4 sm:p-6 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(250, 195, 205, 0.3) 0%, rgba(250, 223, 200, 0.3) 100%)`,
          border: "1px solid #FAC3CD",
        }}
      >
        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`text-lg sm:text-xl font-bold ${getRankColor(entry.rank)}`}>
                #{entry.rank}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{entry.name}</h3>
              </div>
            </div>
            {entry.badge && getBadgeDisplay(entry.badge)}
          </div>
          <div className="flex items-center justify-between pl-10">
            <span className="text-xs text-slate-500">Points</span>
            <span className="font-bold text-slate-800">
              {entry.points.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 gap-3 sm:gap-4 items-center">
          <div className={`col-span-1 text-lg font-bold ${getRankColor(entry.rank)}`}>
            #{entry.rank}
          </div>
          <div className="col-span-5">
            <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{entry.name}</h3>
          </div>
          <div className="col-span-3">
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              {entry.points.toLocaleString()}
            </span>
          </div>
          <div className="col-span-3">
            {entry.badge && getBadgeDisplay(entry.badge)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
