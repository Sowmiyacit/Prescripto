import React, { useEffect, useState } from "react"; 
import { createContext } from "react";
import axios from 'axios'
export const AppContext=createContext()


export const AppContextProvider=(props)=>{
    const currentSymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const [userData, setUserData] = useState({ address: { line1: '', line2: '' } });


    const getDoctorsData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                alert(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }
    const loadUserProfileData=async()=>{
        try {
           const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}}) 
           if(data.success){
               setUserData(data.userData)
           }
           else{
            alert(data.message)
           }
        } catch (error) {
            console.log(error); 
            alert(error.message)
        }
    }
    const value={
        doctors,getDoctorsData,
        currentSymbol,
        token,
        setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
   }
    useEffect(()=>{
        getDoctorsData()
    },[])
    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}