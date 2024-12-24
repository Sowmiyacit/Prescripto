import React, { useContext, useState } from 'react'
import logo from '../assets/assets_frontend/logo.svg'
import profile from '../assets/assets_frontend/profile_pic.png'
import drop from '../assets/assets_frontend/dropdown_icon.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
const Navbar = () => {
    const navigate =useNavigate();
    const {token,setToken,userData}=useContext(AppContext);
    const [showMenu,setShowMenu]=useState(false);
   
    const logout=()=>{
      setToken('');
      localStorage.removeItem('token')
    }


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 shadow-md border-b-gray-400'> 
        <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer' src={logo}/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li> 
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden '/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5  m-auto hidden'/>
            </NavLink>

        </ul>
        <div className='flex items-center gap-4'>
        {token ? (
  <div className="flex items-center gap-2 cursor-pointer group relative">
    <img className="w-8 rounded-full" src={userData.image} />
    <img className="w-2.5" src={drop}></img>
    {/* Dropdown menu needs to be inside the group parent */}
    <div className="absolute top-8 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block bg-white shadow-md p-4 rounded-md">
      <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
        <p onClick={()=>navigate('/my-profile')} className="py-2 cursor-pointer hover:text-primary">My Profile</p>
        <p onClick={()=>navigate('/my-appointments')} className="py-2 cursor-pointer hover:text-primary">My Appointments</p>
        <p onClick={logout} className="py-2 cursor-pointer hover:text-red-500">Logout</p>
      </div>
    </div>
  </div>
) : (
  <button
    onClick={() => navigate('/login')}
    className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
  >
    Create account
  </button>
)}
<img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon}></img>
<div className={`${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
  <div className='flex items-center justify-between px-5 px-6'>
    <img className='w-36' src={assets.logo} alt=""></img>
    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=""></img>
  </div>
  <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
     <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
     <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL MOVIES</p></NavLink>
     <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
     <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>     
  </ul>
</div>
        </div>
        
    </div>
  )
}

export default Navbar