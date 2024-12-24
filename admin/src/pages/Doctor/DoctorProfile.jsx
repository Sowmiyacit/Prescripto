import React, { useState, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setPofileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        ...profileData,
        address: {
          ...profileData.address,
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like address.line1 and address.line2
    if (name.startsWith("address.")) {
      const key = name.split(".")[1]; // Extract "line1" or "line2"
      setPofileData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setPofileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setPofileData((prev) => ({ ...prev, available: checked }));
  };

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="flex justify-center md:w-1/3">
            <img
              src={profileData.image || `${backendUrl}/default-profile.png`}
              alt="Doctor"
              className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
          </div>

          {/* Doctor Details */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800">
              {profileData.name}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <p className="font-medium">
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="px-3 py-1 text-sm text-white bg-green-500 rounded-full">
                {profileData.experience} years
              </button>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-700">About:</p>
              {isEdit ? (
                <textarea
                  name="about"
                  onChange={handleInputChange}
                  value={profileData.about || ""}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full h-24"
                />
              ) : (
                <p className="mt-2 text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Appointment Fee */}
            <div className="mt-6 flex items-center gap-2 text-xl text-gray-800">
              <p className="font-semibold">Appointment Fee:</p>
              {isEdit ? (
                <input
                  type="number"
                  name="fees"
                  onChange={handleInputChange}
                  value={profileData.fees || ""}
                  className="border border-gray-300 rounded-md px-3 py-1 w-32"
                />
              ) : (
                <span>
                  {currency}
                  {profileData.fees}
                </span>
              )}
            </div>

            {/* Address Section */}
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-700">Address:</p>
              {isEdit ? (
                <div>
                  <input
                    type="text"
                    name="address.line1"
                    onChange={handleInputChange}
                    value={profileData.address?.line1 || ""}
                    className="border border-gray-300 rounded-md px-3 py-1 w-full mb-2"
                    placeholder="Line 1"
                  />
                  <input
                    type="text"
                    name="address.line2"
                    onChange={handleInputChange}
                    value={profileData.address?.line2 || ""}
                    className="border border-gray-300 rounded-md px-3 py-1 w-full"
                    placeholder="Line 2"
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </p>
              )}
            </div>

            {/* Availability Section */}
            <div className="mt-6 flex items-center gap-2">
              {isEdit ? (
                <input
                  type="checkbox"
                  checked={profileData.available || false}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5"
                />
              ) : (
                <input
                  type="checkbox"
                  checked={profileData.available || false}
                  disabled
                  className="h-5 w-5"
                />
              )}
              <label htmlFor="availability" className="text-gray-600">
                Available
              </label>
            </div>

            {/* Edit and Save Buttons */}
            <div className="mt-6 flex gap-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
