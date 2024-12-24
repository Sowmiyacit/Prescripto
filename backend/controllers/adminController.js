
//API for adding Doctor
import validator from "validator";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import apopointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js"

export const addDoctor=async(req,res)=>{
    try{
       const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
       const imageFile=req.file
       

       if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter valid email"});
       }
       //validating strong password
       if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"});
       }

       //hashing doctor password
       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)
    
       //upload image to cloudinary
       const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
       const imageUrl=imageUpload.secure_url

       const doctorData={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
       }

       const newDoctor=new doctorModel(doctorData)
       await newDoctor.save()
                   .then(() => console.log("Document saved"))
                   .catch((err) => console.error("Save failed:", err));

       res.json({success:true,message:"Doctor Added"})
    }


    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
}

//Admin Login

export const loginAdmin=async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
          const token=jwt.sign(email+password,process.env.JWT_SECRET)
          res.json({success:true,token})
       }
       else{
        res.json({success:false,message:"Invalid credentials"});
       }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})

    }
}


// api to get all doctors list

export const allDoctors=async(req,res)=>{
    try{
       const doctors=await doctorModel.find({}).select('-password')
       res.json({success:true,doctors});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//API TO GET ALL APPOINTMENTS LIST
export const appointmentAdmin=async(req,res)=>{
    try{
        const appointments=await apopointmentModel.find({})
        res.json({success:true,appointments})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export const appointmentCancel=async(req,res)=>{
    try{
        const {appointmentId}=req.body;
        const appointmentData=await apopointmentModel.findById(appointmentId)
       
        await apopointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        //releasing doctor slot
        const {docId,slotDate,slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment cancelled"})
    }
    catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
 }


 //API to get dashboard data for admin panel

 export const adminDashboard=async(req,res)=>{
    try{
         const doctors=await doctorModel.find({})
         const users=await userModel.find({})
         const appointments=await apopointmentModel.find({})
          
         const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
         }
         res.json({success:true,dashData})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
 }