const mongoose = require("mongoose");
const { clinicSchema } = require("./clinics");

// Doctor schema with nested clinics and additional fields
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
  clinics: [clinicSchema], // An array of clinics, each with its own slots
  fees_inclinic: {
    type: Number,
    required: true,
  },
  fees_voice: {
    type: Number,
    required: true,
  },
  fees_video: {
    type: Number,
    required: true,
  },
  education: {
    type: [String], // Array of strings for educational qualifications
    default: [],
  },
  biography: {
    type: String,
    default: "",
  },
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  experience: {
    type: Number, // Number of years of experience
    default: 0,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = { Doctor, doctorSchema };
