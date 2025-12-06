const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const {LoggedinOnly}=require('./middleware')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/userroute')
const taskRouter=require('./routes/taskroute')

const app=express();
const PORT=5000;

dotenv.config();

const allowedOrigins=[
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

mongoose.connect('mongodb://127.0.0.1:27017/habitping')
.then((res)=>{
    console.log(`MongoDB connected`)
})
.catch((e)=>{
    console.log(e);
})

app.use('/api/user',userRouter);
app.use('/api/task',LoggedinOnly,taskRouter);

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})