import { motion } from 'framer-motion'

export default function LeaderboardRow({ entry, index }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      className="group font-inter"
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
          <div className="flex items-center justify-between">

               <div className='flex items-center gap-2'>
                <span>{index+1}.</span>
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{entry.NickName}</h3>
              </div>

            <span className="font-bold text-[0.8rem] sm:text-[1.2rem] text-slate-800">
              {entry.Points.toLocaleString()}
            </span>

              <div className={`text-[0.7rem] flex flex-col items-center sm:text-lg font-bold`}>
                <img className='rounded-full h-[3rem] sm:h-[4rem]' src={`/${entry.Rank}.jpg`}/>
                {entry.Rank}
              </div>
             
          </div>
          
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-around gap-6 items-center">
        
          <div className="flex items-center gap-4">
             <span>{index+1}.</span>
            <h3 className="font-bold text-slate-800 text-sm sm:text-lg md:text-[1.5rem]">{entry.NickName}</h3>
          </div>

          <div>
            <span className="font-bold text-slate-800 text-sm sm:text-[1.6rem]">
              {entry.Points.toLocaleString()}
            </span>
          </div>

          <div className={`text-lg font-bold flex flex-col justify-center items-center`}>
            <img className='rounded-full h-[6rem]' src={`/${entry.Rank}.jpg`}/>
            {entry.Rank}
          </div>

        </div>
      </div>
    </motion.div>
  )
}
