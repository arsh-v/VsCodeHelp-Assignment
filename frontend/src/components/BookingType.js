import React, { useState, useMemo } from "react";
import { useCurrentDoctor } from "../context/doctor";
import { useSelectedAppointment } from "../context/appointment";
import { Link } from "react-router-dom";

const BookingType = ({ selectedClinic }) => {
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { currentDoctor } = useCurrentDoctor();
  const { selectedAppointment, setSelectedAppointment } =
    useSelectedAppointment();

  const slotsData = useMemo(() => {
    if (currentDoctor && currentDoctor.clinics.length > 0) {
      const clinic = currentDoctor.clinics.find(
        (clinic) => clinic.name === selectedClinic
      );
      if (clinic) {
        return clinic.slots;
      }
    }
    return {};
  }, [currentDoctor, selectedClinic]);

  const slotOnSelectedDate = useMemo(() => {
    if (selectedDate && slotsData) {
      let clinic = currentDoctor.clinics.find(
        (clinic) => clinic.name === selectedClinic
      );
      if (!clinic) {
        return [];
      }
      let slots = clinic.slots;
      let returnSlots = [];
      for (const slot in slots) {
        let slotDate = new Date(slots[slot].date);
        console.log(
          "slotDate",
          slotDate.toDateString(),
          "Selected",
          selectedDate.toDateString()
        );
        if (slotDate.toDateString() === selectedDate.toDateString()) {
          returnSlots.push(slots[slot]);
        }
      }
      return returnSlots;
    }
    return [];
  }, [selectedDate, slotsData, selectedClinic, currentDoctor]);

  const renderSlots = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + currentDateIndex);

    const formattedDates = [...Array(3)].map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index);
      return date; // Adjust date formatting as needed
    });

    return (
      <div className='flex flex-col items-center space-y-4'>
        <div className='flex flex-row items-center space-x-4'>
          {formattedDates.map((date, index) => (
            <div key={index} className='bg-blue-500 px-10 p-2'>
              <button
                onClick={() => {
                  setSelectedDate(new Date(date));
                }}
              >
                <div
                  className={`font-bold text-center ${
                    selectedDate.toDateString() ===
                    new Date(date).toDateString()
                      ? "underline"
                      : ""
                  }`}
                >
                  {date.toLocaleDateString()}
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className='m-2 w-full'>
          <div className='grid grid-cols-3 place-content-around w-full place-items-center'>
            {slotOnSelectedDate.length > 0
              ? slotOnSelectedDate.map((slot, slotIndex) => (
                  <div
                    className={
                      slot.isBooked
                        ? "bg-gray-600 text-white m-1 text-center border rounded-lg px-16 py-2"
                        : selectedSlot === slot
                        ? "bg-green-400 m-1 text-center border rounded-lg px-16 py-2"
                        : "bg-white m-1 text-center border rounded-lg px-16 py-2"
                    }
                    key={slotIndex}
                  >
                    <button
                      onClick={() => {
                        if (slot.isBooked) {
                          alert("Slot is already booked");
                          return;
                        }
                        setSelectedSlot(slot);
                      }}
                    >
                      {slot.startTime}
                    </button>
                  </div>
                ))
              : "No slots available for this date"}
          </div>
        </div>

        {selectedSlot && (
          <div className='flex flex-row justify-end'>
            <Link to='/booking-confirmation'>
              <button
                className='bg-green-500 text-white px-4 py-2 rounded-md'
                onClick={() => {
                  // save current doctor and selected appointment to local storage
                  localStorage.setItem(
                    "currentDoctor",
                    JSON.stringify(currentDoctor)
                  );
                  localStorage.setItem(
                    "selectedAppointment",
                    JSON.stringify({
                      ...selectedAppointment,
                      slot: selectedSlot,
                    })
                    );
                  setSelectedAppointment({
                    ...selectedAppointment,
                    slot: selectedSlot,
                  });
                }}
              >
                Continue
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  const handleNextDate = () => {
    setCurrentDateIndex(currentDateIndex + 3);
  };

  const handlePrevDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 3);
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <button
        className='bg-gray-400 p-2 rounded-md text-2xl font-bold'
        onClick={handlePrevDate}
        disabled={currentDateIndex === 0}
      >
        &lt;
      </button>
      {renderSlots()}
      <button
        className='bg-gray-400 p-2 rounded-md text-2xl font-bold'
        onClick={handleNextDate}
      >
        &gt;
      </button>
    </div>
  );
};

export default BookingType;
