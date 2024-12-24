import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
//app confi

const app=express();
const port=process.env.PORT||4000;
connectDB();
connectCloudinary();
//middleware

app.use(express.json());
app.use(cors());


//api
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)
//localhost:4000/api/admin/
//http://localhost:4000/api/user/register
app.listen(port,()=>{
    console.log(`Server started ${port}`);
})