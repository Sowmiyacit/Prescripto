import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const { getDashData, aToken, dashData, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Stats */}
        <div className="flex flex-wrap gap-6">
          {/* Doctors */}
          <div className="flex items-center p-4 bg-white shadow rounded-lg flex-1 min-w-[250px]">
            <img
              src={assets.doctor_icon}
              alt="Doctors Icon"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-sm text-gray-600">Doctors</p>
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
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.docData.name}
                    </p>
                    <p className="text-sm text-gray-600">{item.slotDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
8