require("dotenv").config();
const mongoose = require("mongoose");
const { Doctor, Appointment } = require("../models"); // Adjust the path as necessary

console.log(process.env.MONGO_URI);


// Function to generate time slots
function generateTimeSlots(date, startTime, endTime) {
  const slots = [];
  let currentDate = new Date();
  let slotDate = new Date(date);

  let current = new Date(
    slotDate.toISOString().split("T")[0] + "T" + startTime + ":00Z"
  );
  let end = new Date(
    slotDate.toISOString().split("T")[0] + "T" + endTime + ":00Z"
  );

  while (current < end) {
    if (current > currentDate) {
      const startSlot = current.toISOString().substring(11, 16);
      current.setMinutes(current.getMinutes() + 15); // Increment by 15 minutes
      const endSlot = current.toISOString().substring(11, 16);

      if (current <= end) {
        slots.push({ date: slotDate, startTime: startSlot, isBooked: false });
      }
    } else {
      current.setMinutes(current.getMinutes() + 15); // Skip past slots
    }
  }
  return slots;
}

// Function to create slots for different days
const createSlotsForDay = (day) => {
  switch (day) {
    case "Monday":
      return generateTimeSlots("10:00", "12:00");
    case "Tuesday":
      return generateTimeSlots("10:30", "13:30");
    case "Wednesday":
      return generateTimeSlots("11:00", "14:00");
    case "Thursday":
      return generateTimeSlots("10:15", "12:45");
    case "Friday":
      return generateTimeSlots("10:00", "14:00");
    default:
      return [];
  }
};

const doctorsData = [
  // Dr. Alice
  {
    name: "Dr. Alice",
    specialty: "Cardiology",
    fees_inclinic: 300,
    fees_voice: 320,
    fees_video: 350,
    education: ["MD, Cardiology", "BSc, Medical Sciences"],
    biography: "Dr. Alice has over 10 years of experience in cardiology...",
    faqs: [
      {
        question: "What is a healthy heart rate?",
        answer: "A healthy heart rate is typically 60-100 bpm.",
      },
      {
        question: "How often should I get my heart checked?",
        answer:
          "It's recommended to have a heart check-up at least once a year.",
      },
    ],
    experience: 10,
    clinics: [
      {
        name: "Heart Clinic",
        address: "123 Heart St",
        slots: [], // Slots will be populated later
      },
      {
        name: "Video_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
      {
        name: "Voice_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
    ],
  },
  // Dr. Bob
  {
    name: "Dr. Bob",
    specialty: "Dermatology",
    fees_inclinic: 250,
    fees_voice: 320,
    fees_video: 350,
    education: ["MD, Dermatology", "BSc, Biology"],
    biography:
      "Dr. Bob specializes in skin health and has been practicing for over 8 years...",
    faqs: [
      {
        question: "How to protect skin in summer?",
        answer:
          "Use sunscreen with an SPF of at least 30, wear protective clothing, and stay hydrated.",
      },
      // ... More FAQs ...
    ],
    experience: 8,
    clinics: [
      {
        name: "Skin Care Clinic",
        address: "456 Skin Ave",
        slots: [], // Slots will be populated later
      },
      {
        name: "Healthy Skin Clinic",
        address: "789 Derm Rd",
        slots: [], // Slots will be populated later
      },
      {
        name: "Video_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
      {
        name: "Voice_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
    ],
  },
  // Dr. Charlie
  {
    name: "Dr. Charlie",
    specialty: "Pediatrics",
    fees_inclinic: 200,
    fees_voice: 320,
    fees_video: 350,
    education: ["MD, Pediatrics", "BSc, Child Health"],
    biography:
      "With a gentle approach, Dr. Charlie has been caring for children's health for over 12 years...",
    faqs: [
      {
        question: "When should my child first see a pediatrician?",
        answer:
          "It's recommended to visit a pediatrician within the first week after birth.",
      },
      // ... More FAQs ...
    ],
    experience: 12,
    clinics: [
      {
        name: "Kids Care Clinic",
        address: "101 Kid Ln",
        slots: [], // Slots will be populated later
      },
      {
        name: "Video_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
      {
        name: "Voice_Slot",
        address: "online",
        slots: [], // Slots will be populated later
      },
    ],
  },
  // Add more doctors as needed...
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const today = new Date();
const daysToAdd = weekdays
  .slice(today.getDay() - 1)
  .concat(weekdays.slice(0, today.getDay() - 1));

doctorsData.forEach((doctor) => {
  doctor.clinics.forEach((clinic) => {
    clinic.slots = [];
    daysToAdd.forEach((day, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() + index);
      clinic.slots.push(
        ...generateTimeSlots(date.toISOString().split("T")[0], "10:00", "14:00")
      );
    });
  });
});

// Function to populate data
const populateData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Drop collections if needed
    await Doctor.deleteMany({});
    console.log("Existing collections cleared");
    for (const doctorData of doctorsData) {
      const doctor = new Doctor(doctorData);
      await doctor.save();
    }
    console.log("Data populated successfully");
  } catch (err) {
    console.error("Error populating data:", err.message);
  } finally {
    mongoose.disconnect();
  }
};
populateData();
