import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import { FaArrowLeft } from "react-icons/fa";
import { useCurrentDoctor } from '../context/doctor';
import { useSelectedAppointment } from '../context/appointment';

function getInitials(name) {
  const nameArray = name.split(" ");

  if (nameArray.length === 1) {
    // Only one name, return the first letter
    return nameArray[0].charAt(0).toUpperCase();
  } else {
    // First letter of the first name and first letter of the last name
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
    const lastNameInitial = nameArray[nameArray.length - 1]
      .charAt(0)
      .toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  }
}

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { selectedAppointment } = useSelectedAppointment();
  const { currentDoctor } = useCurrentDoctor();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const isBookAppointmentPage = location.pathname === '/book-appointment' || location.pathname === '/booking-confirmation';

  return (
    <>
      {isBookAppointmentPage ? (
        <nav className='fixed top-0 left-0 right-0 p-4 px-6 sm:px-20 shadow-md bg-white z-10'>
          <div className='container mx-auto flex items-center justify-between'>
            <div className='flex items-center'>
              <Link to='/' className='flex items-center'>
                <div className=' bg-red-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  {getInitials(currentDoctor?.name || "Loading ...")}
                </div>
                {/* Change this when slot is selected */}
                <FaArrowLeft className='text-gray-500' />
                <p className='font-bold text-gray-500 flex p-2'>
                  {selectedAppointment?.type + " Consulatncy" || "Loading ..."}
                </p>
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className='fixed top-0 left-0 right-0 p-4 px-6 sm:px-20 shadow-md bg-white z-10'>
          <div className='container mx-auto flex items-center justify-between'>
            <div className='flex items-center'>
              <Link to='/' className='flex items-center'>
                <div className=' bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  {getInitials(currentDoctor?.name || "Loading ...")}
                </div>
                <span className='text-black text-xl font-medium'>
                  {currentDoctor?.name || "Loading ..."}
                </span>
              </Link>
            </div>

            {/* Responsive Menu Button */}
            <div className='block sm:hidden'>
              <button
                onClick={toggleMenu}
                className='text-black p-2 focus:outline-none focus:bg-gray-300'
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Responsive Menu Items */}
            <div
              className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ${
                isMenuOpen ? "flex" : "hidden"
              } sm:flex absolute top-14 right-4 sm:relative sm:top-0 bg-gray-100 p-4 rounded-md`}
            >
              <Link to='/' className='text-black font-medium'>
                Home
              </Link>
              <Link to='/treatment' className='text-black font-medium'>
                Treatment
              </Link>
              <Link to='/health-blogs' className='text-black font-medium'>
                Health Blogs
              </Link>
              <Link to='/about' className='text-black font-medium'>
                About
              </Link>
              <Link to='/book-appointment' className='text-black font-medium'>
                Book Appointment
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
