import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // Updated to null initially
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      
     

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Log FormData for debugging
      console.log("FormData Entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      console.log("Backend URL:", backendUrl);
      console.log("Token:", aToken);

      const { data } = await axios.post(backendUrl + "/api/admin/add-doctor", formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error while adding doctor:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg"
      onSubmit={onSubmitHandler}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-8 text-center">Add Doctor</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Image Section */}
        <div className="flex flex-col items-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} // Fixed for preview
              alt="Upload Doctor"
              className="w-32 h-32 object-cover rounded-full border-2 border-dashed border-gray-300"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="text-sm mt-2 text-gray-500 text-center">
            Upload doctor picture
          </p>
        </div>

        {/* Doctor Details */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Doctor Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Doctor Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Doctor Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Fees</label>
            <input
              type="number"
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Speciality, Education, Address */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Speciality</label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Education</label>
          <input
            type="text"
            placeholder="Education"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            placeholder="Address 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Address 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-1">About Doctor</label>
        <textarea
          rows="4"
          placeholder="Write about doctor"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

