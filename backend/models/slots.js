const mongoose = require("mongoose");

// Schema for available slots within a clinic
const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    match: [
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please fill a valid time format (HH:MM)",
    ], // Validates time format (HH:MM)
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = { Slot, slotSchema };
