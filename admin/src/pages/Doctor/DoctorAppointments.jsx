import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {
  const { dToken, appointments,cancelAppointment,completeAppointment, getAppointments } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  const handleAction = (actionType, appointmentId) => {
    console.log(`${actionType} Appointment:`, appointmentId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-5 text-xl font-bold text-gray-700">All Appointments</p>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md text-sm overflow-hidden">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] bg-gray-100 py-3 px-6 font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] items-center py-4 px-6 border-b hover:bg-gray-50"
            >
              <p>{index + 1}</p>
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.userData.image || '/default-avatar.png'}
                  alt={`${item.userData.name || 'Unknown'}'s avatar`}
                />
                <p className="font-medium text-gray-800">{item.userData.name || 'Unknown'}</p>
              </div>
              <p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {item.payment ? 'Online' : 'CASH'}
                </span>
              </p>
              <p>{item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className="font-medium text-gray-700">{item.amount ? `${currency}${item.amount}` : 'N/A'}</p>
              {
                item.cancelled
                ?<p className='text-red-400 text-xs font-medium'>Cancelled</p>
                :item.isCompleted
                ?<p className='text-green-500 text-xs font-medium'>Completed</p>
                :
                <div className='flex'>
                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeAppointment(item._id)}className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              }
             
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
