const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { LoggedinOnly } = require('./middleware')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userroute')
const taskRouter = require('./routes/taskroute');
const { worker1 } = require('./service');
const cron = require('node-cron')

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const allowedOrigins = [
  'https://habitping.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
]
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    cron.schedule("* * * * *", () => {
      console.log("Task running every minute:", new Date());
      worker1();
    });
  })
  .catch(err => console.log("Mongo Error", err));


app.use('/api/user', userRouter);
app.use('/api/task', LoggedinOnly, taskRouter);



app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
})