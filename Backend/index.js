const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const {LoggedinOnly}=require('./middleware')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/userroute')
const taskRouter=require('./routes/taskroute');
const { worker1 } = require('./service');

const app=express();
const PORT=process.env.PORT || 5000;

dotenv.config();

const allowedOrigins=[
    'https://habitping.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
]
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log(`MongoDB connected`)
})
.catch((e)=>{
    console.log(e);
})

app.use('/api/user',userRouter);
app.use('/api/task',LoggedinOnly,taskRouter);

const timer=setInterval(() => {
    worker1()
}, 60*1000);

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})