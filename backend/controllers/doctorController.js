import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import apopointmentModel from '../models/appointmentModel.js';

export const changeAvailability=async(req,res)=>{
    try{
      const {docId}=req.body;
      const docData=await doctorModel.findById(docId);
      await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
      res.json({success:true,message:"Availability Changed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export const doctorList=async(req,res)=>{
  try{
     const doctors=await doctorModel.find({}).select(['-password','-email'])
     res.json({success:true,doctors});
  }
  catch(error){
      console.log(error);
      res.json({success:false,message:error.message})
  }
}

//API for doctor login

export const loginDoctor=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const doctor=await doctorModel.findOne({email})
    if(!doctor){
       return res.json({success:false,message:"Invalid Credentials"});

    }
    const isMatch=await bcrypt.compare(password,doctor.password)
    if(isMatch){
      const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token});
    }
    else{
      res.json({success:false,message:"Invalid Credentials"});
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}


//API to get doctor appointments for doctor panel

export const appointmentsDoctor=async(req,res)=>{
  try{
     const {docId}=req.body;
    
     const appointments=await apopointmentModel.find({docId})
     res.json({success:true,appointments})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//API to mark appointment completed for doctor panel

export const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    
    // Await the result of findById
    const appointmentData = await apopointmentModel.findById(appointmentId);
    
    console.log(appointmentData);

    // Check if appointmentData exists and the docId matches
    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
      // Update the appointment to completed
      await apopointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      // If the data does not match or does not exist
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};



export const appointmentCancel=async(req,res)=>{
  try {
     const {docId,appointmentId}=req.body
     const appointmentData=await apopointmentModel.findById(appointmentId)
     console.log(appointmentData)
     if(appointmentData && appointmentData.docId===docId){
      await apopointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      return res.json({success:true,message:"Appointment Cancelled"})
     }
     else{
      res.json({success:false,message:"Cancellation Failed"})
     }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

export const doctorDashboard=async(req,res)=>{
  try {
    const {docId}=req.body
    const appointments=await apopointmentModel.find({docId})
    let earnings=0
    appointments.map((item)=>{
       if (item.isCompleted || item.payment) {
          earnings+=item.amount
       }
    })

    let patients=["vicky"]

    appointments.map((item)=>{
       if(patients.includes(item.userId)){
        patients.push(item.userId)
       }
    })

    const dashData={
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointmnet:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}
export const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    // Ensure docId is provided
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const profileData = await doctorModel.findById(docId).select('-password');
    
    if (!profileData) {
      return res.status(404).json({ success: false, message: "Doctor profile not found" });
    }

    res.json({ success: true, data: profileData });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    // Ensure docId and at least one field to update is provided
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }
    if (!fees && !address && typeof available === "undefined") {
      return res.status(400).json({ success: false, message: "No update data provided" });
    }

    const updatedProfile = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ success: false, message: "Doctor profile not found" });
    }

    res.json({ success: true, message: "Profile updated", data: updatedProfile });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
