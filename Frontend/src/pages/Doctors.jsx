import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter]=useState(false)
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedSpeciality, setSelectedSpeciality] = useState(speciality || '');
  <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? `bg-primary text-white`: '' }`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  // Function to navigate and update selected speciality
  const handleNavigate = (selectedSpeciality) => {
    setSelectedSpeciality(selectedSpeciality); // Track the selected speciality
    navigate(`/doctors/${selectedSpeciality}`);
  };

  // Function to filter doctors based on speciality
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  // Apply filter whenever doctors or speciality changes
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar for Specialities */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => handleNavigate(spec)} // Navigate and select the speciality
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
                selectedSpeciality === spec
                  ? 'bg-sky-100 border-sky-500 text-sky-700' // Highlight selected speciality
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50"
                src={item.image}
                alt={`Profile of Dr. ${item.name}, a ${item.speciality}`}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;




