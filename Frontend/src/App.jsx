import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import PaymentSuccess from './pages/paymentSuccess'
import PaymentCancel from "./pages/PaymentCancel";
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footor from './components/Footor'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (

    <div className='mx-4 sm:mx-[10%]' >
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<Doctors /> }/>
        <Route path='/doctors/:speciality' element={<Doctors/> }/>
        <Route path='/login' element={<Login /> }/>
        <Route path='/about' element={<About /> }/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/my-profile' element={<Myprofile />}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path='/my-appointments' element={<MyAppointment />}/>
        <Route path='/appointment/:docId' element={<Appointment />}/>
      </Routes>
      <Footor/>
    </div>
  )
}

export default App