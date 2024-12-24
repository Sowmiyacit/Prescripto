import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Myprofile = () => {
  const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data}=await axios.post('http://localhost:4000/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }

    }
     
     catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile.');
    }
  };

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  return userData && (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Profile Picture */}
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer">
          <div>
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile Preview"
              className="w-36 h-32 rounded-full border-4 border-gray-300"
            />
            <img src={assets.upload_icon} alt="Upload Icon" className="w-8 h-8 mt-2" />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          src={userData.image}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
      )}

      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            className="mt-4 text-lg font-semibold text-center border-b-2 border-gray-400 focus:outline-none"
          />
        ) : (
          <p className="mt-4 text-xl font-bold text-gray-700">{userData.name}</p>
        )}
      </div>

      <hr className="mb-6 border-gray-300" />

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p className="text-gray-700">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone:</p>
            {isEdit ? (
              <input
                type="number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData?.address?.line1 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="w-full border rounded-md p-2"
                />
                <input
                  type="text"
                  value={userData?.address?.line2 || ''}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData?.address?.line1 || 'N/A'} <br />
                {userData?.address?.line2 || 'N/A'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                className="w-full border rounded-md p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="w-full border rounded-md p-2"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            if (isEdit) updateUserProfileData();
            setIsEdit(!isEdit);
          }}
          className={`px-6 py-2 text-white rounded-md ${
            isEdit ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isEdit ? 'Save Information' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Myprofile;
