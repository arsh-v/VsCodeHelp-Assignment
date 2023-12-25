import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { NO_PICTURE_URL } from "../constants/urls";
import { useCurrentDoctor } from "../context/doctor";

function getInitials(name) {
  const nameArray = name.split(' ');

  if (nameArray.length === 1) {
    // Only one name, return the first letter
    return nameArray[0].charAt(0).toUpperCase();
  } else {
    // First letter of the first name and first letter of the last name
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
    const lastNameInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  }
}

const Slider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentDoctor, setCurrentDoctor } = useCurrentDoctor();

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleSetTo = (index) => {
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    setCurrentDoctor(items[currentIndex]);
  }, [currentIndex, items, setCurrentDoctor]);

  function formatSlotTime(slot) {
    if (!slot || !slot.date || !slot.startTime) {
      return "Unavailable";
    }

    // Assuming startTime is in 24-hour format HH:MM
    const slotDateTime = new Date(slot.date);
    const [hours, minutes] = slot.startTime.split(":").map(Number);
    slotDateTime.setHours(hours, minutes, 0, 0);

    // Format time in AM/PM format
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Convert 24-hour to 12-hour format

    // Determine if the slot is for today, tomorrow, or another day
    const today = new Date();
    let dayString = "";

    // Compare just the dates, without time
    const slotDateOnly = slotDateTime.toDateString();
    const todayDateOnly = today.toDateString();
    const tomorrowDateOnly = new Date(
      today.getTime() + 86400000
    ).toDateString();

    if (slotDateOnly === todayDateOnly) {
      dayString = "Today";
    } else if (slotDateOnly === tomorrowDateOnly) {
      dayString = "Tomorrow";
    } else {
      // Use toLocaleDateString() for a more readable date format
      dayString = slotDateTime.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }

    return `${formattedHour}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}, ${dayString}`;
  }



  return (
    <div
      id='default-carousel'
      className='relative w-full p-4 md:p-16'
      data-carousel='slide'
    >
      {/* Carousel wrapper */}
      <div className='relative h-64 md:h-96 overflow-hidden rounded-lg border-2 border-blue-500'>
        {/* Dynamic rendering of items */}
        {items.map((item, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === currentIndex ? "" : "opacity-0"
            }`}
            data-carousel-item
          >
            {/* Display only the current item */}
            <div className='absolute w-full flex justify-center'>
              {/* Your content goes here */}
              <div className='flex flex-col m-4 p-2 md:p-5 px-4 md:px-10 mb-4'>
                <div className='w-32 h-32 md:w-48 md:h-48 border-4 border-green-500 rounded-full flex items-center justify-center bg-green-100 mb-4'>
                  <img
                    src={item?.image || NO_PICTURE_URL}
                    alt={item.name + " profile picture"}
                    className='w-30 h-30 md:w-42 md:h-42 rounded-full object-cover justify-center'
                  />
                </div>
                <div className='text-center ml-4 mb-6'>
                  <p className='text-lg font-bold text-blue-600'>{item.name}</p>
                  <p className='text-sm text-gray-700'>{item.specialty}</p>
                  <p className='text-sm text-gray-700'>
                    {item.education.join(" ,")}
                  </p>
                  <button className='text-green-500 p-2 rounded mt-2 border border-green-500'>
                    Book Appointment
                  </button>
                </div>
              </div>

              <div className='m-4 p-2 md:p-5 px-4 md:px-10 mb-4'>
                <div className='text-xl md:text-2xl font-bold mb-4 text-blue-700'>
                  Book a Clinic Appointment
                </div>
                <div className='bg-white border border-gray-300 rounded-md shadow-md p-2 md:p-4'>
                  <div className='flex items-center text-sm mb-2'>
                    <FontAwesomeIcon
                      icon={faClock}
                      className='mr-2 text-green-400'
                    />
                    Next Available at {formatSlotTime(item.nextAvailableSlot)}
                  </div>
                  <div className='flex flex-wrap items-center text-sm mb-2'>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className='mr-2 text-green-400'
                    />
                    {item.clinicAddress}
                  </div>
                  <hr className='border-t my-2' />
                  <div className='text-green-400'>
                    <div>Book Clinic Visit</div>
                    <p className='text-sm mt-2'>No Booking Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className='absolute z-30 flex -translate-x-1/2 bottom-2 md:bottom-5 left-1/2 space-x-1 md:space-x-3 rtl:space-x-reverse'>
        {items.map((_, index) => (
          <button
            key={index}
            type='button'
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
              index === currentIndex
                ? " bg-blue-700 text-white"
                : " bg-blue-300 text-blue-800"
            }`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => handleSetTo(index)}
          >
            {getInitials(items[index].name)}
          </button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type='button'
        className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-2 md:px-4 cursor-pointer group focus:outline-none'
        data-carousel-prev
        onClick={handlePrevSlide}
      >
        <span className='inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 group-hover:bg-gray-200 dark:group-hover:bg-gray-200 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-200 group-focus:outline-none'>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='w-4 h-4 text-white dark:text-gray-400 rtl:rotate-180'
          />
          <span className='sr-only'>Previous</span>
        </span>
      </button>
      <button
        type='button'
        className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-2 md:px-4 cursor-pointer group focus:outline-none'
        data-carousel-next
        onClick={handleNextSlide}
      >
        <span className='inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-200 group-hover:bg-white/50 dark:group-hover:bg-gray-200 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-200 group-focus:outline-none'>
          <FontAwesomeIcon
            icon={faArrowRight}
            className='w-4 h-4 text-white dark:text-gray-400 rtl:rotate-180'
          />
          <span className='sr-only'>Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
