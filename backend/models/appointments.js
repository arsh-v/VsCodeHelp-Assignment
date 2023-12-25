const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["booked", "completed", "cancelled", "no-show"],
    default: "booked",
  },
  // Add any additional fields or logic as necessary for your application
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment, appointmentSchema };
