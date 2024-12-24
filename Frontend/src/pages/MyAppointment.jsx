import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const MyAppointment = () => {
  const {  token,backendUrl, } = useContext(AppContext);
  const [appointments,setAppointments]=useState([])
  const getUserAppointments=async()=>{

    try{
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())      
        toast.success(data.message)
        console.log(appointments)
      }
      else{     
        toast.error(data.message)
      }
    }
    catch(error){
        console.error( error);
        toast.error(error.message);
    }
  }
  const cancelAppointment=async(appointmentId)=>{
    try{
       const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
       if(data.success){
        toast.success(data.message)
        getUserAppointments()
        console.log(appointments)
      }
      else{     
        toast.error(data.message)
      }
    }
    catch(error){
      console.error( error);
      toast.error(error.message);
    }
  }
  const appointmentStripe = async (appointmentId) => {
    try {
       const { data } = await axios.post(
          `http://localhost:4000/api/user/payment-stripe`,
          { appointmentId },
          { headers: { token } }
       );
       if (data.success) {
          // Redirect user to Stripe Checkout
          window.location.href = data.url;
       } else {
          toast.error(data.message);
       }
    } catch (error) {
       console.error(error);
       toast.error(error.message);
    }
 };
 
  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">My Appointments</h1>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-md"
          >
            {/* Doctor's Image */}
            <div className="w-24 h-24">
              <img
                src={item.docData.image}
                alt={`${item.docData.name}'s profile`}
                className="w-full h-full rounded-full object-cover border border-gray-300"
              />
            </div>

            {/* Doctor's Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700">{item.docData.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.docData.speciality}</p>
              <p className="text-sm font-medium text-gray-600">Address:</p>
              <p className="text-sm text-gray-500">{item.docData.address?.line1|| 'N/A'}</p>
              <p className="text-sm text-gray-500">{item.docData.ddress?.line2|| 'N/A'}</p>
              <p className="text-sm mt-2">
                <span className="font-medium text-gray-600">Date & Time: </span>
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
            {!item.cancelled && <button onClick={()=>appointmentStripe(item._id)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Pay Online
              </button>}
              {!item.cancelled && <button  onClick={()=>cancelAppointment(item._id)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
              >Cancel Appointment
              </button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border-red-500 rounded text-red-300'>Appointment Cancelled</button>}
                
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
