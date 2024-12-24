import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData, cancelAppointment,completeAppointment} =
    useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-6">
          {/* Doctors */}
          <div className="flex items-center p-4 bg-white shadow rounded-lg flex-1 min-w-[250px]">
            <img
              src={assets.earning_icon}
              alt="Doctors Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.earnings}
              </p>
              <p className="text-sm text-gray-600">Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center p-4 bg-white shadow rounded-lg flex-1 min-w-[250px]">
            <img
              src={assets.appointments_icon}
              alt="Appointments Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center p-4 bg-white shadow rounded-lg flex-1 min-w-[250px]">
            <img
              src={assets.patients_icon}
              alt="Patients Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
          </div>
        </div>
        {/* Latest Appointments */}
        <div className="bg-white mt-10 rounded-lg shadow">
          {/* Header Section */}
          <div className="flex items-center px-6 py-4 border-b">
            <img src={assets.list_icon} alt="List Icon" className="w-6 h-6" />
            <p className="ml-3 text-lg font-semibold">Latest Bookings</p>
          </div>

          {/* Appointments List */}
          <div>
            {dashData.latestAppointmnet.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.userData.image}
                    alt="Doctor"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.userData.name}
                    </p>
                    <p className="text-sm text-gray-600">{item.slotDate}</p>
                  </div>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
