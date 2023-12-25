import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaClinicMedical } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { PiCalendarCheck } from "react-icons/pi";
import LoginDetails from './LoginDetails';
import PatientDetails from './PatientDetails';
import { useCurrentDoctor } from "../context/doctor";
import { NO_PICTURE_URL } from '../constants/urls';
import { useSelectedAppointment } from "../context/appointment";

const timeTo12HrFormat = (time) => {
  // Take a time in 24 hour format HH:MM and format it in 12 hour format
  let time_part_array = time.split(":");
  let ampm = 'AM';
  if (time_part_array[0] >= 12) {
    ampm = 'PM';
  }
  if (time_part_array[0] > 12) {
    time_part_array[0] = time_part_array[0] - 12;
  }
  let formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
  return formatted_time;
}

function BookingSlotIdConfirmation() {

  const { currentDoctor, setCurrentDoctor } = useCurrentDoctor();
  const { selectedAppointment, setSelectedAppointment } = useSelectedAppointment();
  console.log("currentDoctor", currentDoctor);
  console.log("selectedAppointment", selectedAppointment);

  const selectedClinic = useMemo(() => {
    if (!currentDoctor || !currentDoctor.clinics) {
      return null;
    }
    let clinic = currentDoctor.clinics.find(clinic => clinic.name === selectedAppointment.clinic);
    if (!clinic) {
      return null;
    }
    console.log("clinic", clinic)
    let type = clinic.name === "Voice_Slot" ? "Audio" : clinic.name === "Video_Slot" ? "Video" : "In-Clinic";
    let fees = clinic.name === "Voice_Slot" ? currentDoctor.fees_voice : clinic.name === "Video_Slot" ? currentDoctor.fees_video : currentDoctor.fees_inclinic;
    return {
      clinic, type, fees
    }
  }, [currentDoctor, selectedAppointment]);

  React.useEffect(() => {
    let localStorageDoctor = JSON.parse(localStorage.getItem("currentDoctor"));
    setCurrentDoctor(localStorageDoctor);

    let localStorageAppointment = JSON.parse(localStorage.getItem("selectedAppointment"));
    setSelectedAppointment(localStorageAppointment);
  }, [setCurrentDoctor, setSelectedAppointment])

  if (!selectedAppointment || !selectedAppointment.slot) {
    return (
      <div>
        <h1>Appointment not selected</h1>
        <p> Go home and select doctor first and then appointment and then proceed </p>
        <Link to="/">Go Home</Link>
      </div>
    )
  }

  return (
    <div className='mt-10 md:mt-32 px-4 md:px-60'>
      {/* Profile Section */}
      <div className='flex flex-col md:flex-row items-center mb-4'>
        {/* Profile Photo */}
        <Link to='/'>
          <div className='bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-4 md:mr-4 md:mb-0'>
            <img
              src={currentDoctor.image || NO_PICTURE_URL}
              alt={currentDoctor.name + " profile picture"}
              className='w-14 h-14 rounded-full object-cover'
            />
          </div>
        </Link>

        {/* Profile Info */}
        <div className='text-center md:text-left'>
          <h2 className='text-lg font-bold'>{currentDoctor.name}</h2>
          <p className='text-sm'>{currentDoctor.specialty}</p>
          <button className='bg-white rounded-md border-blue-400'>
            <Link to='/' className='text-blue-400'>
              VIEW PROFILE
            </Link>
          </button>
        </div>
      </div>

      {/* Line Separator */}
      <hr className='border-t my-4' />

      <div className='font-bold text-1xl'>Appointment Summary</div>
      <div>
        {/* Add Home Symbol with In-Clinic Consultancy, Fees, and Pay at Clinic */}
        <div className='flex items-start my-4'>
          <div className='flex w-1/2'>
            <div className='mr-4 bg-green-200 rounded-full w-8 h-8'>
              {/* Home Symbol */}
              <FaClinicMedical className='w-5 h-5 text-green-600 justify-center relative top-1 left-1.5' />
            </div>
            <div>
              <p className='text-sm'>{selectedClinic.type} Consultancy</p>
              <p className='text-sm text-green-500'>
                Fees approx Rs. {selectedClinic.fees}
              </p>
              {selectedClinic.clinic.address !== "online" ? (
                <p className='text-sm text-purple-500'>(Pay at Clinic)</p>
              ) : (
                <p className='text-sm text-purple-500'>(Pay after call)</p>
              )}
            </div>
          </div>
          <div className='flex'>
            <div className='mr-4 rounded-full w-8 h-8'>
              <CiClock2 className='text-green-600 w-5 h-5 my-2' />
              <PiCalendarCheck className='text-green-600 w-5 h-5 my-2' />
            </div>
            <div className='flex flex-col text-sm'>
              <div className='my-2 text-left'>
                {timeTo12HrFormat(selectedAppointment.slot.startTime)}
              </div>
              <div className=''>{new Date(selectedAppointment.slot.date).toLocaleDateString()}</div>
            </div>
            <div className='ml-6 m-1'>
              <Link
                to='/book-appointment'
                className='text-sm text-blue-700 underline font-bold'
              >
                Change Date & Time
              </Link>
            </div>
          </div>
        </div>
      </div>

      <LoginDetails selectedAppointment={selectedAppointment} selectedClinic={selectedClinic} currentDoctor={currentDoctor} />
      {/* <PatientDetails /> */}
    </div>
  );
}

export default BookingSlotIdConfirmation;
