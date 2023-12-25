import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaClinicMedical, FaVideo } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import BookingType from "./BookingType";
import { useCurrentDoctor } from "../context/doctor";
import { NO_PICTURE_URL } from "../constants/urls";
import { useSelectedAppointment } from "../context/appointment";

const IdentifyBookingType = ({ selectedClinic }) => {
  return (
    <div className=''>
      <BookingType slotType='Audio' selectedClinic={selectedClinic} />
    </div>
  );
};

const BookAppointment = () => {
  const { currentDoctor, setCurrentDoctor } = useCurrentDoctor();
  const { selectedAppointment, setSelectedAppointment } =
    useSelectedAppointment();
  const [selectedType, setSelectedType] = useState("In-Clinic");
  const [dynamicText, setDynamicText] = useState("NA");
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    let localStorageDoctor = JSON.parse(localStorage.getItem("currentDoctor"));
    if (!currentDoctor) {
      setCurrentDoctor(localStorageDoctor);
    }
    if (localStorageDoctor !== currentDoctor && currentDoctor) {
      localStorage.setItem("currentDoctor", JSON.stringify(currentDoctor));
    }

    let localStorageAppointment = JSON.parse(
      localStorage.getItem("selectedAppointment")
    );
    if (!selectedAppointment) {
      setSelectedAppointment(localStorageAppointment);
    }
    if (
      localStorageAppointment !== selectedAppointment &&
      selectedAppointment
    ) {
      localStorage.setItem(
        "selectedAppointment",
        JSON.stringify(selectedAppointment)
      );
    }
  }, [
    currentDoctor,
    setCurrentDoctor,
    selectedAppointment,
    setSelectedAppointment,
  ]);

  const bookingTypes = useMemo(
    () => ({
      "In-Clinic": {
        type: "InClinic",
        color: "success",
        consultationType: "Select Your Consultation Type",
        fees: "₹" + currentDoctor?.fees_inclinic || "NA",
        payAtClinic: true,
        icon: <FaClinicMedical className='text-4xl w-12 h-12 mx-auto my-1' />,
      },
      Audio: {
        type: "Audio",
        codename: "Voice_Slot",
        color: "info",
        consultationType: "Select Your Consultation Type",
        fees: "₹" + currentDoctor?.fees_voice || "NA",
        payAtClinic: false,
        icon: <MdCall className='text-4xl w-12 h-12 mx-auto my-1' />,
      },
      Video: {
        type: "Video",
        codename: "Video_Slot",
        color: "warning",
        consultationType: "Select Your Consultation Type",
        fees: "₹" + currentDoctor?.fees_video || "NA",
        payAtClinic: false,
        icon: <FaVideo className='text-4xl w-12 h-12 mx-auto my-1' />,
      },
    }),
    [currentDoctor]
  );

  const handleTypeChange = (type) => {
    setSelectedType(type);

    // Use a callback function to ensure that the state is updated before further actions
    setSelectedAppointment((prevSelectedAppointment) => {
      const updatedType = bookingTypes[type];
      const updatedClinic =
        type === "In-Clinic"
          ? currentDoctor.clinics.length > 0
            ? currentDoctor.clinics[0].name
            : null
          : updatedType.codename;

      // Update the selected clinic and other appointment details
      setSelectedClinic(updatedClinic);
      setDynamicText(`Fees: approx ${updatedType.fees}`);

      return {
        ...prevSelectedAppointment,
        type: updatedType.type,
        fees: updatedType.fees,
        payAtClinic: updatedType.payAtClinic,
        clinic: updatedClinic,
      };
    });
  };

  React.useEffect(() => {
    setSelectedAppointment({
      ...selectedAppointment,
      type: bookingTypes[selectedType].type,
      fees: bookingTypes[selectedType].fees,
      payAtClinic: bookingTypes[selectedType].payAtClinic,
    });
    setDynamicText(`Fees: approx ${bookingTypes[selectedType].fees}`);
  }, []);

  React.useEffect(() => {
    if (currentDoctor && currentDoctor.clinics.length > 0) {
      setSelectedClinic(currentDoctor.clinics[0].name);
      setSelectedAppointment({
        ...selectedAppointment,
        clinic: currentDoctor.clinics[0].name,
        address: currentDoctor.clinics[0].address,
      });
    }
  }, [currentDoctor]);

  if (!currentDoctor) {
    return (
      <div className='mt-10 md:mt-32 px-4 md:px-48'>
        <h2 className='text-2xl font-bold'> Go Back and select a doctor </h2>
      </div>
    );
  }

  return (
    <div className='mt-10 md:mt-32 px-4 md:px-48'>
      {/* Profile Section */}
      <div className='flex flex-col md:flex-row items-center mb-4'>
        {/* Profile Photo */}
        <Link to='/'>
          <div className='bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-4 md:mr-4 md:mb-0'>
            <img
              src={currentDoctor?.image || NO_PICTURE_URL}
              alt={
                currentDoctor?.name + " profile picture" ||
                "Doctor profile picture"
              }
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

      {/* Options Section */}
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='mb-4 md:mb-0'>
          <h3 className='font-medium'>Book Appointment</h3>
          <div className='text-gray-400'>Select Your Consultation Type</div>
          <div className='text-green-400' id='amountOfConsultation'>
            {dynamicText}
          </div>
        </div>
        <div className='flex flex-wrap justify-center'>
          {Object.keys(bookingTypes).map((type) => (
            <div
              key={type}
              className={`cursor-pointer w-24 h-24 md:w-32 md:h-32 m-2 p-2 md:p-4 rounded-md border-2 ${
                type === selectedType ? "font-bold bg-green-400" : ""
              }`}
              onClick={() => handleTypeChange(type)}
            >
              {bookingTypes[type].icon}
              <p className='text-center'>{type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Line Separator */}
      {selectedType === "In-Clinic" && (
        <div>
          <h3 className='text-lg font-semibold mb-3'>Clinic Name</h3>
          {currentDoctor.clinics
            .filter((clinic) => clinic.address !== "online")
            .map((clinic, index) => (
              <label key={index} className='block mb-4'>
                <input
                  type='radio'
                  name='clinic'
                  value={clinic.address}
                  checked={selectedClinic === clinic.name}
                  onChange={() => setSelectedClinic(clinic.name)}
                  className='text-green-500 mr-2'
                />
                {clinic.address}
              </label>
            ))}
        </div>
      )}

      {/* Selected Booking Type */}
      <IdentifyBookingType selectedClinic={selectedClinic} />
    </div>
  );
};

export default BookAppointment;
