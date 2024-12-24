import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import apopointmentModel from '../models/appointmentModel.js'
import Stripe from 'stripe';
//Api for registration

export const registerUser=async(req,res)=>{
   try{
       const {name,email,password}=req.body;
       if(!name || !password || !email){
            return res.json({success:false,message:"Missings Details"})
       }
       if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
       }
       if(password.length<8){
        return res.json({success:false,message:"Enter a Strong password"})
       }
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt);

       const userData={
        name,
        email,
        password:hashedPassword,

       }

       const newUser=new userModel(userData);
       const user=await newUser.save()
       
       const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
       res.json({success:true,token})
   }
   catch(error){
      console.log(error);
        res.json({success:false,message:error.message})
   }
}

export const loginUser=async(req,res)=>{
    try{
         const {email,password}=req.body;
         const user=await userModel.findOne({email})
         if(!user){
            return res.json({success:false,message:'User does not exist'})
         }
         const isMatch=await bcrypt.compare(password,user.password)
         if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
         }
         else{
            res.json({success:false,message:"Invalid Credentials"})
         }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export const getProfile=async(req,res)=>{
   try{
       const {userId}=req.body;
       const userData=await userModel.findById(userId).select('-password')
       console.log(userData);
       res.json({success:true,userData})
   }
   catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
   }
}
//Api for updating user profile
export const updateProfile=async(req,res)=>{
   try{
       const {userId,name,phone,address,dob,gender}=req.body
       const imageFile=req.file
       
       if(!name||!phone||!address||!dob||!gender){
            return res.json({success:false,message:"Data Missing"})
       }
       await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
       if(imageFile){
         // upload image to the cloudinary
         
         const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
         const imageURL=imageUpload.secure_url
         await userModel.findByIdAndUpdate(userId,{image:imageURL})
       }
       res.json({success:true,message:'profile updated'})
   }
   catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

//API to book appointment

export const bookAppointment=async(req,res)=>{
   try{
       const {userId,docId,slotDate,slotTime}=req.body;
       const docData=await doctorModel.findById(docId).select('-password')
       if(!docData.available){
         return res.json({success:false,message:"Doctor not available"})
       }
       let slots_booked=docData.slots_booked
       //Checking for slots availability
       if(slots_booked[slotDate]){
         if(slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false,message:"Slot not available"})
         }
         else{
            slots_booked[slotDate].push(slotTime)
         }
       }
       else{
         slots_booked[slotDate]=[]
         slots_booked[slotDate].push(slotTime)
       }
       const userData=await userModel.findById(userId).select('-password')
       delete docData.slots_booked

       const appointmentData={
         userId,
         docId,
         userData,
         docData,
         amount:docData.fees,
         slotTime,
         slotDate,
         date:Date.now()
       }
       const newAppointment=new apopointmentModel(appointmentData)
       await newAppointment.save()
       //save new slots data in docData

       await doctorModel.findByIdAndUpdate(docId,{slots_booked})
       res.json({success:true,message:"Appointment Booked"})
   }
   catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

//API to get user appointmnets for frontend my-appointments page
export const listAppointment=async(req,res)=>{
   try{
      const {userId}=req.body
      const appointments=await apopointmentModel.find({userId});
      res.json({success:true,appointments})
   }
   catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

//API for cancel Appointments

export const cancelAppointment=async(req,res)=>{
   try{
       const {userId,appointmentId}=req.body;
       const appointmentData=await apopointmentModel.findById(appointmentId)
       if(appointmentData.userId!==userId){
         return res.json({success:false,message:"Unauthorized Action"})
       }
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

//API to make payment of appointment using stripe



const stripe = new Stripe("sk_test_51QYTHVP0RDsRihpJxertIz2MhkbCoO3iuYQQwdJQsok2QSlwb1fCi3Ws2GXhsMfaosMG8yj662MxyMT8QeQKEnxn00Ssodrkpq");



// API to create a Stripe checkout session for payment
export const paymentStripe = async (req, res) => {
   try {
      const { appointmentId } = req.body;

      // Fetch appointment data
      const appointment = await apopointmentModel.findById(appointmentId);
      if (!appointment || appointment.cancelled) {
        return res.status(404).json({ success: false, message: "Appointment not found or cancelled" });
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: `Appointment with Dr. ${appointment.docData.name}`,
                description: `Slot: ${appointment.slotTime} on ${appointment.slotDate}`,
              },
              unit_amount: appointment.amount * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          appointmentId: appointmentId,
        },
        success_url: 'http://localhost:5173/payment-success',
        cancel_url: 'http://localhost:5173/payment-cancel',
      });

      res.json({ success: true, url: session.url });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
   }
};

// Function to handle payment invoice creation
export const paymentInvoice = async (req, res) => {
  const { customerEmail, amount, description } = req.body;

  try {
    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    // Create an invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amount * 100, // Stripe requires the amount in cents
      currency: "inr",
      description: description,
    });

    // Create and auto-advance the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // Auto-finalize the invoice
    });

    // Wait for the invoice to be finalized
    const finalizedInvoice = await stripe.invoices.retrieve(invoice.id);

    // Respond with the hosted invoice URL, transaction ID, and PDF URL
    res.status(200).json({
      message: "Invoice created successfully",
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      transactionId: finalizedInvoice.id,
      pdfUrl: finalizedInvoice.invoice_pdf, // Stripe provides a direct PDF URL
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Failed to create invoice", error: error.message });
  }
};
