import { useForm, Controller } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { NavLink ,useNavigate} from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"

const CATEGORIES = [
  "Health & Fitness",
  "Learning & Study",
  "Work & Productivity",
  "Self-Care & Wellness",
  "Home & Personal Life",
  "Finance & Money",
  "Social & Lifestyle",
  "Other",
]

const COLOR_OPTIONS = [
  { name: "Pink", value: "#fac3cd", rgb: "rgb(250, 195, 205)" },
  { name: "Peach", value: "#fadfc8", rgb: "rgb(250, 223, 200)" },
  { name: "Lavender", value: "#e6d5f0", rgb: "rgb(230, 213, 240)" },
  { name: "Mint", value: "#d1f0e8", rgb: "rgb(209, 240, 232)" },
  { name: "Butter", value: "#fffacd", rgb: "rgb(255, 250, 205)" },
  { name: "Blush", value: "#fdd7e4", rgb: "rgb(253, 215, 228)" },
]

export default function AddTask() {
    const[timeerror,setTimeError]=useState(false)
  const { control, handleSubmit, watch,reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      taskType: "untimed",
      startTime: "",
      endTime: "",
      category: "Other",
      color: "#fac3cd",
    },
  })

  const taskType = watch("taskType")
  const selectedColor = watch("color")

  const navigate=useNavigate()

  const onSubmit = (data) => {
    const startTime=data.startTime;
    const endTime=data.endTime;
    if(startTime.split(":")[0]>endTime.split(":")[0] || (startTime.split(":")[0]==endTime.split(":")[0] && startTime.split(":")[1]>endTime.split(":")[1])){
        setTimeError(true);
        return;
    }
    const date=new Date().getDate();
    const month=new Date().getMonth();
    data.startTime=`${data.startTime} ${date} ${month+1}`;
    data.endTime=`${data.endTime} ${date} ${month+1}`;
    api.post('/api/task/addnew',data)
    .then((res)=>{
        if(res.data.error){
            toast.error(res.data.error);
            navigate('/signin')
        }
        else if(res.data.success){
            toast.success(res.data.success);
            navigate('/')
        }
    })
    .catch((err)=>{
        console.log(err);
    })
  reset();
  }

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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fff4f2" }}>

        <NavLink 
          to="/"
          className='px-6 py-4 flex items-center gap-1 rounded-2xl border border-[#ffb5de] text-[rgb(255,181,222)] absolute top-4 left-4'>
            <ArrowLeft size={20}/>
            Back
          </NavLink>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mt-8"
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-lg p-8"
          style={{ boxShadow: "0 20px 60px rgba(250, 195, 205, 0.15)" }}
        >
          {/* Heading */}
          <motion.div variants={headingVariants} initial="hidden" animate="visible" className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2" style={{ color: "#fac3cd" }}>
              Create Task
            </h1>
            <p className="text-gray-500 text-sm">Add a new habit or task to your day</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              {/* Title Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#333" }}>
                  Task Title <span className="text-red-400">*</span>
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        {...field}
                        type="text"
                        placeholder="Enter task title"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-transparent focus:outline-none transition-all"
                        style={{
                          focusRing: `0 0 0 3px rgba(250, 195, 205, 0.3)`,
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = "0 0 0 3px rgba(250, 195, 205, 0.3)"
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "none"
                        }}
                      />
                      {error && <p className="text-red-400 text-xs mt-1">{error.message}</p>}
                    </div>
                  )}
                />
              </motion.div>

              {/* Description Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#333" }}>
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <motion.textarea
                      whileFocus={{ scale: 1.02 }}
                      {...field}
                      placeholder="Add details about your task"
                      rows="3"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-transparent focus:outline-none resize-none transition-all"
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(250, 195, 205, 0.3)"
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  )}
                />
              </motion.div>

              {/* Task Type Toggle */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#333" }}>
                  Task Type
                </label>
                <div className="flex gap-3">
                  <Controller
                    name="taskType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => field.onChange("timed")}
                          className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${
                            taskType === "timed" ? "text-white" : "bg-gray-100 text-gray-600"
                          }`}
                          style={
                            taskType === "timed"
                              ? {
                                  background: "linear-gradient(135deg, #fac3cd 0%, #fadfc8 100%)",
                                  boxShadow: "0 4px 15px rgba(250, 195, 205, 0.4)",
                                }
                              : {}
                          }
                        >
                          Timed
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          onClick={() => field.onChange("untimed")}
                          className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${
                            taskType === "untimed" ? "text-white" : "bg-gray-100 text-gray-600"
                          }`}
                          style={
                            taskType === "untimed"
                              ? {
                                  background: "linear-gradient(135deg, #fac3cd 0%, #fadfc8 100%)",
                                  boxShadow: "0 4px 15px rgba(250, 195, 205, 0.4)",
                                }
                              : {}
                          }
                        >
                          Untimed
                        </motion.button>
                      </>
                    )}
                  />
                </div>
              </motion.div>

              {/* Time Fields - Conditional */}
              <AnimatePresence mode="wait">
                {taskType === "timed" && (
                  <motion.div
                    key="time-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* Start Time */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#333" }}>
                        Start Time
                      </label>
                      <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            {...field}
                            type="time"
                            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-transparent focus:outline-none"
                            onFocus={(e) => {
                              e.target.style.boxShadow = "0 0 0 3px rgba(250, 195, 205, 0.3)"
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = "none"
                            }}
                          />
                        )}
                      />
                    </motion.div>

                    {/* End Time */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#333" }}>
                        End Time
                      </label>
                      <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            {...field}
                            type="time"
                            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-transparent focus:outline-none"
                            onFocus={(e) => {
                              e.target.style.boxShadow = "0 0 0 3px rgba(250, 195, 205, 0.3)"
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = "none"
                            }}
                          />
                        )}
                      />
                    </motion.div>
                    {timeerror && (<p className="text-red-400 text-xs mt-1">end time can't be smaller</p>)}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category Dropdown */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#333" }}>
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      {...field}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-transparent focus:outline-none appearance-none bg-white cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' strokeWidth='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = "0 0 0 3px rgba(250, 195, 205, 0.3)"
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none"
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </motion.select>
                  )}
                />
              </motion.div>

              {/* Color Picker */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-4" style={{ color: "#333" }}>
                  Task Color
                </label>
                <div className="flex justify-between gap-3">
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <>
                        {COLOR_OPTIONS.map((color) => (
                          <motion.button
                            key={color.value}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            type="button"
                            onClick={() => field.onChange(color.value)}
                            className="relative w-12 h-12 rounded-full transition-all"
                            style={{
                              backgroundColor: color.value,
                              boxShadow:
                                selectedColor === color.value
                                  ? `0 0 0 3px white, 0 0 0 5px ${color.value}, 0 0 15px ${color.rgb}`
                                  : "0 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        ))}
                      </>
                    )}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 rounded-2xl text-white font-semibold text-lg transition-all"
                  style={{
                    background: "linear-gradient(135deg, #fac3cd 0%, #fadfc8 100%)",
                    boxShadow: "0 4px 15px rgba(250, 195, 205, 0.4)",
                  }}
                >
                  Create Task
                </motion.button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}
