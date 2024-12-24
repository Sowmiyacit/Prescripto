import React, { useState } from "react"; 
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const DoctorContext=createContext()


export const DoctorContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [dashData,setDashData]=useState(false)
    const [profileData,setPofileData]=useState(false)
    const [appointments,setAppointments]=useState([])
    const getAppointments=async()=>{
        try{
           const {data}=await axios.get("http://localhost:4000/api/doctor/appointments",{headers:{dToken}})
           if(data.success){
             setAppointments(data.appointments.reverse());
             
           }
           else{
            toast.error(data.message)
           }
        }
        catch(error){
           console.log(error);
           toast.error(error.message)
        }
    }
    
    const completeAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post('http://localhost:4000/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if(data.success){
                 toast.success(data.message)
                 getAppointments()
                
              }
              else{
               toast.error(data.message)
              }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await axios.post('http://localhost:4000/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if(data.success){
                 toast.success(data.message)
                 getAppointments()
                
              }
              else{
               toast.error(data.message)
              }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getDashData=async()=>{
        try {
            const {data}=await axios.get('http://localhost:4000/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                 setDashData(data.dashData);
                 console.log(data.dashData);
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData=async()=>{
        try{
            const {data}=await axios.get('http://localhost:4000/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                setPofileData(data.data);
                console.log(data.data)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    const value={
        dToken,setDToken,backendUrl,getAppointments,appointments,cancelAppointment,completeAppointment,dashData,setDashData,getDashData,
        profileData,setPofileData,getProfileData,
    }
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}